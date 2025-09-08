from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "This is the homepage"

#1
@app.route("/hello")
def hello():
    return "Hello, world!"

@app.route("/info")
def info():
    return "This is an informational page."

#2
@app.route("/calc/<num1>/<num2>")
def calc(num1, num2):
    try:
        return f"The sum of {num1} and {num2} is {int(num1)+int(num2)}."
    except ValueError:
        return f"Ошибка: входные данные должны быть целыми числами."

#3
@app.route("/reverse/<string>")
def reverse(string):
    if string.strip():
        l = list(string)
        l.reverse()
        return f"{''.join(l)}"
    return f"Ошибка: введите хотя бы один символ."

#4
@app.route("/user/<name>/<int:age>")
def user(name, age):
    if age>=0:
        return f"Hello, {name}. You are {age} years old."
    return f"Ошибка: некорректный возраст."

if __name__ == "__main__":
    app.run(debug=True)


