from flask import Flask, render_template, Response
from utilities import render_emotion_detector


app = Flask(__name__)

@app.route('/')
def index():
    # Video streaming at home page
    return render_template('index.html')

@app.route('/video')
def video():
    # Video streaming route. Put this in the src attribute of an img tag.
    return Response(render_emotion_detector(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__=="__main__":
    app.run(debug=True)