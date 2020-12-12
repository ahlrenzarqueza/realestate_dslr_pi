#!/usr/bin/python3
from flask import Flask, request, jsonify, send_file
from flask_restful import Resource, Api
from flask_cors import CORS
from sqlalchemy import create_engine
from json import dumps
from shutil import copy2, rmtree
import cv2
import numpy as np
import os
import time, threading
import subprocess
import time
import urllib.parse

current_milli_time = lambda: int(round(time.time() * 1000))
db_connect = create_engine('sqlite:///realestate-dslr.db')
app = Flask(__name__)
app.config.from_pyfile('config.py')
api = Api(app)
CORS(app)
cameraInterval = None

def capturecommand(shutterspeed, foldername):
    dirpath = os.path.join(app.config['MEDIA_PATH'], "__temp/" + foldername)
    os.makedirs(dirpath, exist_ok=True);
    try:
        subprocess.check_call(["gphoto2", "--set-config", "shutterspeed=" + str(shutterspeed), "--set-config", "imagesize=0", "--capture-image-and-download"], cwd=dirpath)
        return True
    except subprocess.CalledProcessError:
        return False
    except OSError:
        return False

def readSampleImagesAndTimes(foldername):
    filenames = []
    path = os.path.join(app.config['MEDIA_PATH'], "__temp/" + foldername)
    for file in os.listdir(path):
        if os.path.isfile(os.path.join(path, file)):
            filenames.append(os.path.join(path, file))
    # filenames = [
    #            "images/memorial0061.jpg",
    #            "images/memorial0062.jpg",
    #            "images/memorial0063.jpg",
    #            "images/memorial0064.jpg",
    #            "images/memorial0065.jpg",
    #            "images/memorial0066.jpg",
    #            "images/memorial0067.jpg",
    #            "images/memorial0068.jpg",
    #            "images/memorial0069.jpg",
    #            "images/memorial0070.jpg",
    #            "images/memorial0071.jpg",
    #            "images/memorial0072.jpg",
    #            "images/memorial0073.jpg",
    #            "images/memorial0074.jpg",
    #            "images/memorial0075.jpg",
    #            "images/memorial0076.jpg"
    #            ]

    images = []
    for filename in filenames:
        im = cv2.imread(filename)
        images.append(im)

    return images
   

class HomeProperties(Resource):
    def get(self):
        conn = db_connect.connect()
        query = conn.execute("select * from [home-properties]")
        result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)
    def post(self):
        conn = db_connect.connect()
        print(request.json)
        Address = request.json['address']
        AgentName = request.json['agentName']
        BedroomCount = request.json['numOfBedrooms']
        BathroomCount = request.json['numOfBathrooms']
        query = conn.execute("insert into [home-properties] (address, agentName, bedroomCount, bathroomCount) \
                        values('{0}','{1}',{2},{3})"
                        .format(Address, AgentName, BedroomCount, BathroomCount))
        rowidquery = conn.execute("select last_insert_rowid() from [home-properties]")
        rowid = rowidquery.first().values()[0]
        return {'status':'success', 'id': int(rowid)}

class DeleteHomeProperty(Resource):
    def delete(self, id):
        conn = db_connect.connect()
        query = conn.execute("delete from [home-properties] where id = %d "  %int(id))

        dirpath =  os.path.join(app.config['MEDIA_PATH'], "final-blended/" + str(id))
        if os.path.exists(dirpath):
            rmtree(dirpath)
        return {'status':'success'}

class HomePropertyRooms(Resource):
    def get(self, id):
        conn = db_connect.connect()
        query = conn.execute("select * from [home-rooms] where propertyId =%d "  %int(id))
        result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)
    def post(self, id):
        conn = db_connect.connect()
        print(request.json)
        PropertyId = request.json['propertyId']
        Name = request.json['name']
        Mode = request.json['mode']
        Mediapath = request.json['mediapath']

        query = conn.execute("insert into [home-rooms] (propertyId, Name, Mode, Mediapath) \
                        values({0},'{1}','{2}','{3}')"
                        .format(PropertyId, Name, Mode, ''))

        rowidquery = conn.execute("select last_insert_rowid() from [home-rooms]")
        rowid = rowidquery.first().values()[0]

        dest_filename = str(rowid) + "~" + Name + ".jpg"
        dest_dir = os.path.join(app.config['MEDIA_PATH'], "final-blended/" + str(PropertyId) + "/")
        os.makedirs(dest_dir, exist_ok=True);
        dest_filepath = os.path.join(dest_dir, dest_filename)
        copy2(Mediapath, dest_filepath)

        updatequery = conn.execute("update [home-rooms] set mediapath = '{0}' where roomId = {1}"
                        .format(dest_filepath, rowid))

        return {'status':'success'}

class DeleteHomePropertyRooms(Resource):
    def delete(self, id, roomid):
        conn = db_connect.connect()
        query = conn.execute("select name from [home-rooms] where roomId =%d "  %int(roomid))
        roomName = query.first().values()[0]

        query = conn.execute("delete from [home-rooms] where roomId = %d "  %int(roomid))

        dest_filename = str(roomid) + "~" + str(roomName) + ".jpg";
        dest_dir = os.path.join(app.config['MEDIA_PATH'], "final-blended/" + str(id) + "/")
        filepath = os.path.join(dest_dir, dest_filename)
        if os.path.exists(filepath):
            os.remove(filepath)
        return {'status':'success'}

class StaticFileServer(Resource):
    def get(self):
        file = request.args.get('file')
        # pathlist = filedir.split('/')
        # filename = pathlist.pop()
        # parentpath = '/'.join(pathlist)
        # print(parentpath)
        # print(filename)
        # formatted_path = os.path.join(os.getcwd(), filedir)
        decodedfilepath = urllib.parse.unquote(file)
        return send_file(decodedfilepath)

class Camera(Resource):
    def get(self, scene):
        # scene = request.args.get('scene')
        print("Scene: " + scene)

        print("Capturing images ... ")

        # pkill -f gphoto2
        subprocess.call(['pkill', '-f', 'gphoto2'])

        try: 
            getShutterChoice = subprocess.check_output(["gphoto2", "--get-config", "shutterspeed"])
        except subprocess.CalledProcessError:
            return {'status': 'error', 'message': 'Camera problem. Please check if it is connected properly.'}, 500
        except OSError:
            return {'status': 'error', 'message': 'Camera problem. Please check if it is connected properly.'}, 500
        
        getShutterChoice = str(getShutterChoice)
        
        currentIndex = getShutterChoice.index("Current: ")
        nextLineIndex = getShutterChoice.index("\\n", currentIndex + 9)
        currentShutterVal = getShutterChoice[(currentIndex+9):nextLineIndex]

        choiceIndex = getShutterChoice[nextLineIndex:].index(currentShutterVal)
        lastLineBreakIndex = getShutterChoice[ : (choiceIndex+nextLineIndex) ].rfind("\\n")
        choiceNumberIndex = getShutterChoice[lastLineBreakIndex : (choiceIndex+nextLineIndex)].index("Choice: ")

        choiceNumberIndex = lastLineBreakIndex + choiceNumberIndex + 8
        choiceNumSpaceIndex = getShutterChoice[choiceNumberIndex : (choiceIndex+nextLineIndex)].index(" ")

        choiceNumber = getShutterChoice[choiceNumberIndex : (choiceNumberIndex + choiceNumSpaceIndex)]
        choiceNumber = int(choiceNumber)

        captureKey = str(current_milli_time())

        if scene == 'outdoor':
            noerror = True
            speed = choiceNumber - 6
            while noerror == True and speed <= (choiceNumber + 6):
                noerror = capturecommand(speed, captureKey)
                speed = speed + 6

            if noerror == False:
                return {'status': 'error', 'message': 'Camera busy. To fix, please restart the DSLR camera connected to Pi.'}, 500
            
        else:
            noerror = True
            speed = choiceNumber - 6
            while noerror == True and speed <= (choiceNumber + 6):
                noerror = capturecommand(speed, captureKey)
                speed = speed + 6

            if noerror == False:
                return {'status': 'error', 'message': 'Camera busy. To fix, please restart the DSLR camera connected to Pi.'}, 500

        subprocess.check_output(["gphoto2", "--set-config", "shutterspeed=" + str(choiceNumber)])
        print("Reading images ... ")
  
        images = readSampleImagesAndTimes(captureKey)
        needsAlignment = False
        
        # Align input images
        if needsAlignment:
            print("Aligning images ... ")
            alignMTB = cv2.createAlignMTB()
            alignMTB.process(images, images)
        else :
            print("Skipping alignment ... ")
        
        # Merge using Exposure Fusion
        print("Merging using Exposure Fusion ... ");
        mergeMertens = cv2.createMergeMertens()
        exposureFusion = mergeMertens.process(images)

        # Save output image
        print("Saving output ... " + captureKey + ".jpg")
        os.makedirs(os.path.join(app.config['MEDIA_PATH'], "__temp/__blended"), exist_ok=True)
        outputpath = os.path.join(app.config['MEDIA_PATH'], "__temp/__blended/" + captureKey + ".jpg")
        cv2.imwrite(outputpath, exposureFusion * 255)
        return outputpath
        
class setInterval :
    def __init__(self,interval,action) :
        self.interval=interval
        self.action=action
        self.stopEvent=threading.Event()
        thread=threading.Thread(target=self.__setInterval)
        thread.start()

    def __setInterval(self) :
        nextTime=time.time()+self.interval
        while not self.stopEvent.wait(nextTime-time.time()) :
            nextTime+=self.interval
            self.action()

    def cancel(self) :
        self.stopEvent.set()

def capture_image():
    print("Interval function running...")

class StreamCamera(Resource):

    def get(self, enabled):
        global cameraInterval
        # scene = request.args.get('scene')
        print("enabled: " + enabled)
        if enabled == "true" :
            print("Enabling interval to capture-stream image ... ")
            cameraInterval = setInterval(2, capture_image)
        else:
            print("Disabling capture-stream image ... ")
            cameraInterval.cancel()
  
        
        return {'status':'success'}

# api.add_resource(Employees, '/employees') # Route_1
# api.add_resource(Tracks, '/tracks') # Route_2
# api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3
# api.add_resource(HomeProperties, '/homeproperties')
api.add_resource(HomeProperties, '/homeproperties')
api.add_resource(DeleteHomeProperty, '/homeproperties/delete/<id>')
api.add_resource(HomePropertyRooms, '/homeproperties/<id>')
api.add_resource(DeleteHomePropertyRooms, '/homeproperties/delete/<id>/<roomid>')
api.add_resource(StaticFileServer, '/staticfile')
api.add_resource(Camera, '/camera/<scene>')
api.add_resource(StreamCamera, '/stream/<enabled>')

if __name__ == '__main__':
    app.run()