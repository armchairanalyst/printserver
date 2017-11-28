from flask import Flask, request, send_from_directory
import os, subprocess,sys
import json
import logging

app = Flask(__name__)

script_path = os.path.dirname(os.path.realpath(__file__))
receiptfilepath = script_path+"\\receipt.txt"
powershellscripthpath = script_path+"\\printreceipt.ps1"
print(script_path)
print(receiptfilepath)
print(powershellscripthpath)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


@app.route('/print', methods=['POST','GET'])
def process():
    print("Request Received")
    #Initiate the output variable.
    jdata = ""
    output=""
    # Get the data from the URL
    jdata = request.args.get('data')

    #Convert the data from JSON to an array format.
    jdata = json.loads(jdata)
    for line in jdata:
        print(line)
        output+=line+os.linesep

    print(output)
    writeToFile(output)
    return "OK"

def writeToFile(data):
    # Clear contents of File 
    f = open(receiptfilepath,'w')
    f.write(data)
    f.close()
    subprocess.Popen(["powershell.exe",powershellscripthpath])
    print("Printing successfully completed")

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js',path)


if __name__=='__main__':
    app.run(
        host='127.0.0.1',
        port=5000
    )