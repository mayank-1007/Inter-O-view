import streamlit as st
from groq import Groq

# Replace with your actual API key
client = Groq(api_key="API")

st.title("Interview Arena")
st.write("Start your interview! by greeting the interviewer.")

# Initialize the session state to store the conversation history
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "You are an interviewer and need to interview for an SDE role in your company. Ask questions and counter questions, and at the end, when I say 'show me result', show whether I am recruited or not. Also, don't add notes, recommendations, or suggestions in the answer. Make it a real interview. Please respond as you would in a real interview."}
    ]

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
        messages=st.session_state.messages,
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
