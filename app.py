from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('inicio.html')

@app.route('/hombre')
def hombre():
    return render_template('hombre.html')

@app.route('/mujer')
def mujer():
    return render_template('mujer.html')

@app.route('/arabes')
def arabes():
    return render_template('arabes.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
