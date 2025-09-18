from flask import render_template, request, redirect, url_for
from app import app

#Главная
@app.route("/")
def index():
    return render_template("index.html")

#Контакты
@app.route("/contact", methods=["POST", "GET"])
def submit():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")
        return render_template("contact.html", status='')
    else:
        return render_template("contact.html", status='hide')

#О нас
@app.route("/about")
def about():
    return render_template("about.html")
