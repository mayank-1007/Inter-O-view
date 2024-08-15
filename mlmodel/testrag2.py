import streamlit as st
from groq import Groq
import PyPDF2

# Replace with your actual API key
client = Groq(api_key="API_KEY")

st.title("Interview Arena")
st.write("Start your interview! by greeting the interviewer.")

about_DRDO="DRDO is the R&D wing of Ministry of Defence, Govt of India, with a vision to empower India with cutting-edge defence technologies and a mission to achieve self-reliance in critical defence technologies and systems, while equipping our armed forces with state-of-the-art weapon systems and equipment in accordance with requirements laid down by the three Services. DRDO's pursuit of self-reliance and successful indigenous development and production of strategic systems and platforms such as Agni and Prithvi series of missiles; light combat aircraft, Tejas; multi-barrel rocket launcher, Pinaka; air defence system, Akash; a wide range of radars and electronic warfare systems; etc., have given quantum jump to India's military might, generating effective deterrence and providing crucial leverage.'Balasya Mulam Vigyanam'—the source of strength is science-drives the nation in peace and war. DRDO has firm determination to make the nation strong and self-reliant in terms of science and technology, especially in the field of military technologies.DRDO was formed in 1958 from the amalgamation of the then already functioning Technical Development Establishment (TDEs) of the Indian Army and the Directorate of Technical Development & Production (DTDP) with the Defence Science Organisation (DSO). DRDO was then a small organisation with 10 establishments or laboratories. Over the years, it has grown multi-directionally in terms of the variety of subject disciplines, number of laboratories, achievements and stature.Today, DRDO is a network of around 41 laboratories and 05 DRDO Young Scientist Laboratories (DYSLs) which are deeply engaged in developing defence technologies covering various disciplines, like aeronautics, armaments, electronics, combat vehicles, engineering systems, instrumentation, missiles, advanced computing and simulation, special materials, naval systems, life sciences, training, information systems and agriculture. Several major projects for the development of missiles, armaments, light combat aircrafts, radars, electronic warfare systems etc are on hand and significant achievements have already been made in several such technologies."

st.session_state.about_DRDO = about_DRDO

about_job="The Centre for Artificial Intelligence & Robotics (CAIR), a premier institute under the Defence Research and Development Organization (DRDO), is seeking applications from young and meritorious Indian nationals for the position of Junior Research Fellowship (JRF). The fellowship offers an opportunity to pursue advanced research in areas related to Computer Science and Engineering. Position Details: Post: Junior Research Fellowship (JRF); Vacancy Code: JRF-01; Qualifications: Graduate degree in Computer Science (BE/B.Tech.) in Computer Science/Computer Engineering in first division from an AICTE-accredited institute/university with NET/GATE qualification OR Postgraduate degree in a professional course (ME/M.Tech.) in Computer Science/Computer Engineering in first division at both graduate and postgraduate levels from AICTE-accredited institutes/universities. Knowledge of Cryptography, Coding theory, and proficiency in programming languages is desirable. Tenure: Initially for 2 years, may be extended and upgraded to SRF as per rules. Stipend: ₹37,000 per month + HRA. Age Limit: Maximum 28 years as of the closing date, with age relaxation for SC/ST/OBC/PH as per government norms."

st.session_state.about_job = about_job

# Initialize the session state to store the conversation history and resume text
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "system", 
            "content": "You are an officer, from DRDO(Defence Research & Development Organisation), conducting a professional interview for an vacancy Your goal is to evaluate the candidate's technical skills, problem-solving abilities, and cultural fit for DRDO. Throughout the interview, if the candidate provides irrelevant responses (e.g., simple arithmetic questions like '2+5'), politely but firmly redirect them back to the interview questions. If the candidate persists in providing irrelevant answers, inform them that the interview cannot proceed without serious engagement and conclude the interview.The interview should include a mix of questions and counter-questions, assessing the candidate's coding, system design, and problem-solving skills. Near the end, based on the candidate's performance, provide a final result indicating whether they are selected or not, along with a score out of 100. The candidate should not be aware that this is a simulation. After delivering the final result, end the conversation with a professional greeting and do not provide any further responses."
        }
    ]
    st.session_state.resume_text = ""

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
    st.session_state.resume_text = resume_text
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
        messages=st.session_state.messages + [{"role": "system", "content": st.session_state.resume_text}],
        model="llama3-8b-8192",
    )

    response_text = chat_completion.choices[0].message.content
    st.session_state.messages.append({"role": "assistant", "content": response_text})

    # Display the new messages
    st.markdown(f"""
        <div style="border: 1px solid #444; padding: 10px; border-radius: 5px; background-color: #222; color: #fff;">
            <strong>Interviewer:</strong> {response_text}
        </div>
    """, unsafe_allow_html=True)

print(st.session_state)