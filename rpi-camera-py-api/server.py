#!/usr/bin/python3
from flask import Flask, request, jsonify, send_file
from flask_restful import Resource, Api
from flask_cors import CORS
from sqlalchemy import create_engine
from json import dumps
from shutil import copy2
import cv2
import numpy as np
import os

db_connect = create_engine('sqlite:///realestate-dslr.db')
app = Flask(__name__)
app.config.from_pyfile('config.py')
api = Api(app)
CORS(app)

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
        return {'status':'success'}

class HomeRooms(Resource):
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
        
        dest_filename = str(PropertyId) + "~" + Name + ".jpg";
        dest_dir = os.path.join(app.config['MEDIA_PATH'], str(PropertyId) + "/")
        os.makedirs(dest_dir, exist_ok=True);
        dest_filepath = os.path.join(dest_dir, dest_filename)
        copy2(Mediapath, dest_filepath)
        query = conn.execute("insert into [home-rooms] (propertyId, Name, Mode, Mediapath) \
                        values({0},'{1}','{2}','{3}')"
                        .format(PropertyId, Name, Mode, dest_filepath))
        return {'status':'success'}

class StaticFileServer(Resource):
    def get(self, filedir):
        # pathlist = filedir.split('/')
        # filename = pathlist.pop()
        # parentpath = '/'.join(pathlist)
        # print(parentpath)
        # print(filename)
        return send_file(filedir)

class Camera(Resource):
    def get(self, scene):
        # scene = request.args.get('scene')
        print("Scene: " + scene)
        print("Reading images ... ")
  
        # if len(sys.argv) > 1:
        #     # Read images from the command line
        #     images = []
        #     for filename in sys.argv[1:]:
        #     im = cv2.imread(filename)
        #     images.append(im)
        #     needsAlignment = False
        # else :
            # Read example images
        images = readSampleImagesAndTimes()
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
        print("Saving output ... temp.jpg")
        os.makedirs(os.path.join(app.config['MEDIA_PATH'], "__tmp"), exist_ok=True)
        outputpath = os.path.join(app.config['MEDIA_PATH'], "__tmp/temp.jpg")
        cv2.imwrite(outputpath, exposureFusion * 255)
        return outputpath
        

def readSampleImagesAndTimes():
  
  filenames = [
               "images/memorial0061.jpg",
               "images/memorial0062.jpg",
               "images/memorial0063.jpg",
               "images/memorial0064.jpg",
               "images/memorial0065.jpg",
               "images/memorial0066.jpg",
               "images/memorial0067.jpg",
               "images/memorial0068.jpg",
               "images/memorial0069.jpg",
               "images/memorial0070.jpg",
               "images/memorial0071.jpg",
               "images/memorial0072.jpg",
               "images/memorial0073.jpg",
               "images/memorial0074.jpg",
               "images/memorial0075.jpg",
               "images/memorial0076.jpg"
               ]

  images = []
  for filename in filenames:
    im = cv2.imread(filename)
    images.append(im)
  
  return images


# class Employees(Resource):
#     def get(self):
#         conn = db_connect.connect() # connect to database
#         query = conn.execute("select * from employees") # This line performs query and returns json result
#         return {'employees': [i[0] for i in query.cursor.fetchall()]} # Fetches first column that is Employee ID
    
#     def post(self):
#         conn = db_connect.connect()
#         print(request.json)
#         LastName = request.json['LastName']
#         FirstName = request.json['FirstName']
#         Title = request.json['Title']
#         ReportsTo = request.json['ReportsTo']
#         BirthDate = request.json['BirthDate']
#         HireDate = request.json['HireDate']
#         Address = request.json['Address']
#         City = request.json['City']
#         State = request.json['State']
#         Country = request.json['Country']
#         PostalCode = request.json['PostalCode']
#         Phone = request.json['Phone']
#         Fax = request.json['Fax']
#         Email = request.json['Email']
#         query = conn.execute("insert into employees values(null,'{0}','{1}','{2}','{3}', \
#                              '{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}', \
#                              '{13}')".format(LastName,FirstName,Title,
#                              ReportsTo, BirthDate, HireDate, Address,
#                              City, State, Country, PostalCode, Phone, Fax,
#                              Email))
#         return {'status':'success'}

    
# class Tracks(Resource):
#     def get(self):
#         conn = db_connect.connect()
#         query = conn.execute("select trackid, name, composer, unitprice from tracks;")
#         result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
#         return jsonify(result)

    
# class Employees_Name(Resource):
#     def get(self, employee_id):
#         conn = db_connect.connect()
#         query = conn.execute("select * from employees where EmployeeId =%d "  %int(employee_id))
#         result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
#         return jsonify(result)

class TestResource(Resource):
    def get(self):
        return 'hello world'

# api.add_resource(Employees, '/employees') # Route_1
# api.add_resource(Tracks, '/tracks') # Route_2
# api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3
api.add_resource(HomeProperties, '/homeproperties')
api.add_resource(HomeRooms, '/homeproperties/<id>')
api.add_resource(StaticFileServer, '/staticfile/<path:filedir>')
api.add_resource(Camera, '/camera/<scene>')
api.add_resource(TestResource, '/test') # Route_Test

if __name__ == '__main__':
     app.run()