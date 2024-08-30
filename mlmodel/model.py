from groq import Groq  # Assuming you have the correct import for Groq

client = Groq(api_key="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")


name =""
post = ""
vacancy =["SDE", "ML-Scientist", "Junior Research Fellow"]
skills =["CP", "WebDev", "AI-ML", "Algorithms"]

conversation_history = [
    {"role": "system", "content": f"You are Manoj Kumar, a male officer from the Defence Research & Development Organisation (DRDO), responsible for conducting a professional interview (High level Interview) for a job vacancy for {vacancy}. Your objective is to thoroughly assess the candidate's technical skills specifically {skills}, problem-solving abilities, and cultural fit Innovation and Creativity, Teamwork and Collaboration , Decision Making  for DRDO. The interview should be structured to include a mix of technical, psychological questions, along with appropriate follow-up questions to probe deeper into the candidate's knowledge. Throughout the interview, maintain a formal and professional tone. If the candidate provides irrelevant responses (e.g., answering simple arithmetic questions like '2+5'), politely but firmly redirect them to focus on the interview questions. Note : Even try to limit the length of questions to be 30-50 words. If the candidate continues to provide irrelevant answers or engages in unproductive behaviour, calmly inform them that the interview cannot proceed without serious engagement, and if necessary, end the interview by stating that the session will be concluded due to a lack of relevant responses. Ensure that each question is asked clearly and concisely, and avoid overwhelming the candidate by limiting the number of questions asked at once. At the conclusion of the interview, you need to evaluate the candidate's overall performance. When I say end the interview , you need to enter the interview , be strict and try to note which questions are not able to be answered by the interviewee. You are not entering into the real world simulation. Try not to make up things, please clear and concise. Don't ever add 'Please note that this is a formal and professional interview, and I expect your responses to be relevant and concise. If you have any questions or concerns, please feel free to ask.' in answer response. Start by taking introduction and then to make skill related questions and counter questions."},
    {"role": "user", "content": f"My name is {name} and i am applying for the post of {post}"}
]


def final_dashboard_json():
    prompt = """Please provide a summary of the interview using the following JSON format.:

    {
        "BasicDetails": {
            "Name of Candidate": "",
            "Vacancy": "",
            "SkillsNeeded": []
        },
        "Scores": {
            "EducationalBackgroundScore": 0,
            "Experience": 0,
            "InterpersonalCommunication": 0,
            "TechnicalKnowledge": 0,
            "OverallScore": 0
        },
        "InterviewSummary": {
            "PositivePoints": "",
            "NegativePoints": ""
        }
    }

    Instructions:

    BasicDetails:

    Name: The name of the candidate.
    Vacancy: The position or role for which the interview was conducted.
    SkillsNeeded: List of skills required for the position.
    Scores(Very Very Strict Marking considering all responses recorded during interview conversation):

    EducationalBackgroundScore: Score based on the candidate's educational qualifications.(Out of 10)
    Experience: Score based on the candidate's relevant work experience.(Out of 10)
    InterpersonalCommunication: Score based on the candidate's ability to communicate and interact effectively.(Out of 10)
    TechnicalKnowledge: Score based on the candidate's technical skills and knowledge.(Out of 10)
    OverallScore: Overall performance score of the candidate.(Try to be less than 50 for bad candidate and 60-70 at max Out of 100)

    InterviewSummary:

    PositivePoints: Key strengths or positive aspects observed during the interview.
    NegativePoints: Key weaknesses or areas of concern noted during the interview.Give 2-3 negative points in ordered format.
    Please ensure the output is strictly in the JSON format provided and reflects a professional evaluation of the interview. Avoid including any speculative or non-factual information.
    """
    
    conversation_history.append({"role": "user", "content": prompt})

    try:
        chat_completion = client.chat.completions.create(
            messages=conversation_history,
            model="llama3-8b-8192",
        )
        response_text = chat_completion.choices[0].message.content
    except Exception as e:
       
        return "Error"

    return response_text

def get_response(user_input):

    try:

        if (user_input.lower() == "exit"):
            return final_dashboard_json(conversation_history)
        
        else:

            conversation_history.append({"role": "user", "content": user_input})

            chat_completion = client.chat.completions.create(
            messages=conversation_history,
            model="llama3-8b-8192",
            )

            response_text = chat_completion.choices[0].message.content
            conversation_history.append({"role": "assistant", "content": response_text})

            return response_text
        
    except Exception as e:
     
        return "Error"


def initializeInterviewee(username,appliedPost):
    name = username
    post = appliedPost

