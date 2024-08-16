import streamlit as st
from groq import Groq
import PyPDF2

def chunk_text(text, chunk_size, overlap):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return ''.join(chunks)

chunk_size = 1000 
overlap = 200

# Replace with your actual API key
client = Groq(api_key="API_KEY")

st.title("Interview Arena")
st.write("Start your interview! by greeting the interviewer.")

about_DRDO="DRDO is the R&D wing of Ministry of Defence, Govt of India, with a vision to empower India with cutting-edge defence technologies and a mission to achieve self-reliance in critical defence technologies and systems, while equipping our armed forces with state-of-the-art weapon systems and equipment in accordance with requirements laid down by the three Services. DRDO's pursuit of self-reliance and successful indigenous development and production of strategic systems and platforms such as Agni and Prithvi series of missiles; light combat aircraft, Tejas; multi-barrel rocket launcher, Pinaka; air defence system, Akash; a wide range of radars and electronic warfare systems; etc., have given quantum jump to India's military might, generating effective deterrence and providing crucial leverage.'Balasya Mulam Vigyanam'—the source of strength is science-drives the nation in peace and war. DRDO has firm determination to make the nation strong and self-reliant in terms of science and technology, especially in the field of military technologies.DRDO was formed in 1958 from the amalgamation of the then already functioning Technical Development Establishment (TDEs) of the Indian Army and the Directorate of Technical Development & Production (DTDP) with the Defence Science Organisation (DSO). DRDO was then a small organisation with 10 establishments or laboratories. Over the years, it has grown multi-directionally in terms of the variety of subject disciplines, number of laboratories, achievements and stature.Today, DRDO is a network of around 41 laboratories and 05 DRDO Young Scientist Laboratories (DYSLs) which are deeply engaged in developing defence technologies covering various disciplines, like aeronautics, armaments, electronics, combat vehicles, engineering systems, instrumentation, missiles, advanced computing and simulation, special materials, naval systems, life sciences, training, information systems and agriculture. Several major projects for the development of missiles, armaments, light combat aircrafts, radars, electronic warfare systems etc are on hand and significant achievements have already been made in several such technologies."

st.session_state.about_DRDO_chunks = chunk_text(about_DRDO, chunk_size, overlap)

job_advertisement_reader=PyPDF2.PdfReader("advtCAIR07082024.pdf")
job_advertisement_text=""
for page_num in range(len(job_advertisement_reader.pages)):
    page=job_advertisement_reader.pages[page_num]
    job_advertisement_text+=page.extract_text()

st.session_state.about_job_chunks = chunk_text(job_advertisement_text, chunk_size, overlap) 

# Initialize the session state to store the conversation history and resume text
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "system", 
            "content": "You are Rahul, a male officer from the Defence Research & Development Organisation (DRDO), responsible for conducting a professional interview for a job vacancy. Your objective is to thoroughly assess the candidate's technical skills, problem-solving abilities, and cultural fit for DRDO. The interview should be structured to include a mix of coding, system design, and problem-solving questions, along with appropriate follow-up questions to probe deeper into the candidate's knowledge. Throughout the interview, maintain a formal and professional tone. If the candidate provides irrelevant responses (e.g., answering simple arithmetic questions like '2+5'), politely but firmly redirect them to focus on the interview questions. If the candidate continues to provide irrelevant answers or engages in unproductive behavior, calmly inform them that the interview cannot proceed without serious engagement, and if necessary, end the interview by stating that the session will be concluded due to a lack of relevant responses. Ensure that each question is asked clearly and concisely, and avoid overwhelming the candidate by limiting the number of questions asked at once. At the conclusion of the interview, evaluate the candidate's overall performance. Provide a final decision on their application by stating whether they are 'Selected' or 'Not Selected' and include a score out of 100 in the format: 'Result: [Selected/Not Selected] \n Score: [score]'. After delivering the final result, conclude the conversation with a professional closing remark, such as 'Thank you for your time. We will be in touch with the results shortly.' Once the final result is given, do not respond to any further messages. The candidate must not be made aware that this is a simulated interview under any circumstances. Maintain the integrity of the interview process throughout the interaction, and do not provide any feedback or guidance on improving responses."
    
        }
    ]

# File uploader for the resume
uploaded_file = st.file_uploader("Upload your resume (PDF)", type="pdf")

if uploaded_file:
    # Extract text from the uploaded PDF using PyPDF2
    pdf_reader = PyPDF2.PdfReader(uploaded_file)
    resume_text = ""
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        resume_text += page.extract_text()

    # Update session state with the resume text
    st.session_state.resume_text_chunks = chunk_text(resume_text, chunk_size, overlap)
    st.write("Resume uploaded and processed successfully.")

# Display the conversation history
for msg in st.session_state.messages:
    if msg["role"] != "system":
        if msg["role"] == "user":
            st.markdown(f"""
                <div style="border: 1px solid #444; padding: 10px; border-radius: 5px; background-color: #333; color: #fff;">
                    <strong>You:</strong> {msg['content']}
                </div>
            """, unsafe_allow_html=True)
        else:
            st.markdown(f"""
                <div style="border: 1px solid #444; padding: 10px; border-radius: 5px; background-color: #222; color: #fff;">
                    <strong>Interviewer:</strong> {msg['content']}
                </div>
            """, unsafe_allow_html=True)

# Fixed input box at the bottom
user_input = st.chat_input("Your response:")

if user_input:
    st.markdown(f"""
        <div style="border: 1px solid #444; padding: 10px; border-radius: 5px; background-color: #333; color: #fff;">
            <strong>You:</strong> {user_input}
        </div>
    """, unsafe_allow_html=True)

    # Add the user's input to the conversation history
    st.session_state.messages.append({"role": "user", "content": user_input})

    # Get the model's response
    chat_completion = client.chat.completions.create(
        messages=st.session_state.messages + [
            {"role": "system", "content": st.session_state.resume_text_chunks},
            {"role": "system", "content": st.session_state.about_DRDO_chunks},
            {"role": "system", "content": st.session_state.about_job_chunks}
        ],
        # model="llama3-8b-8192",
        model="llama-3.1-70b-versatile",
    )

    response_text = chat_completion.choices[0].message.content
    st.session_state.messages.append({"role": "assistant", "content": response_text})

    # Display the new messages
    st.markdown(f"""
        <div style="border: 1px solid #444; padding: 10px; border-radius: 5px; background-color: #222; color: #fff;">
            <strong>Interviewer:</strong> {response_text}
        </div>
    """, unsafe_allow_html=True)
