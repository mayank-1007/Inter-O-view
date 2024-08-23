from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins, adjust as needed

@app.route('/end_interview')
def end_interview():
    data = {
        "summary": {
            "BasicDetails": {
                "Name": "John Doe",
                "SkillsNeeded": ["Java", "Python", "Agile Development"],
                "Vacancy": "Software Engineer"
            },
            "InterviewSummary": {
                "NegativePoints": "The candidate's educational background, although relevant, was not specifically focused on software engineering. Additionally, there was a lack of direct experience with the specific tools and technologies used in the company.",
                "PositivePoints": "The candidate demonstrated strong technical knowledge of Java and Python, and showed enthusiasm for Agile development. He also presented his projects in a clear and concise manner."
            },
            "Scores": {
                "EducationalBackgroundScore": 90,
                "Experience": 80,
                "InterpersonalCommunication": 85,
                "OverallScore": 88,
                "TechnicalKnowledge": 95
            }
        }
    }
    return jsonify(data)
