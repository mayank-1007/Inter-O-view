# [AI-Based Interviewer](https://int-o-view.vercel.app/)

This project is an AI-based interviewer application designed to simulate a professional interview environment. It leverages two Large Language Models (LLMs) provided by Groq: Gemma2-9b for faster inference and reasoning model qwen qwq for better reference. The application automatically converses with the interviewee and, at the end, provides a detailed dashboard with scores and summaries.

## Features

- **Automated Interview Process**: The AI conducts the interview by asking questions, evaluating responses, and providing feedback. This ensures a consistent and unbiased interview process.
- **Dual LLM Integration**: Utilizes Groq's Gemma2-9b for quick responses and reasoning model qwen qwq for more detailed and nuanced interactions, combining speed with depth.
- **Real-Time Conversation**: The AI maintains a conversation history and adapts its questions based on the interviewee's responses, creating a dynamic and interactive interview experience.
- **AI Interviewer Tailored with Indian Voice**: For seamless interaction and to make the interviewee comfortable, the AI interviewer uses Eleven Labs for voice synthesis, tailored to speak with an Indian voice.
- **Dashboard Summary**: At the end of the interview, the application generates a detailed summary including scores and key points, providing a comprehensive overview of the candidate's performance.

## Workflow

1. **Home Page**
   - A user-friendly responsive homepage with a spectacular design.
   - Login option on the home page helps to authenticate the recruiter.

2. **Authentication**
   - Simplified verification process for the recruiter (admin) to access the admin dashboard via Email OTP Validation.

3. **Initializing Recruitment Opportunity**
   - A descriptive job & skill selection form for a specific vacancy for which the interview has to be taken.

4. **Interview Link Generation**
   - An individualized link will be sent to the candidate's Email ID that will redirect the candidate to the interview room.

5. **Interview Room**
   - The magical area where all interaction happens with the virtual interviewer. The AI asks questions, evaluates responses, and provides real-time feedback.

6. **Quantitative Metrics**
   - At the end of the interview, on the recruiter’s dashboard, quantitative metrics will be shown covering key scores, interview summary, and other key metrics for the recruiter to take the final call.


## Image Gallery

Here are some images related to the project:

![Image 1][1]

![Image 2][2]

![Image 3][3]

![Image 4][4]

![Image 5][5]

![Model Workflow](https://i.sstatic.net/WWJt9AwX.png)

[1]: https://i.sstatic.net/mdahM6Ds.png
[2]: https://i.sstatic.net/MBS1ViFp.png
[3]: https://i.sstatic.net/BH8O4TCz.png
[4]: https://i.sstatic.net/zOF0VPy5.png
[5]: https://i.sstatic.net/Qs0kvUSn.jpg

## Note

The website is running on Render's free servers, so there might be a delay when it is opened after a long time.

## Video Demonstration

Watch the video demonstration of the project on YouTube:

[![Watch the video](https://img.youtube.com/vi/DihqVOpJFls/maxresdefault.jpg)](https://youtu.be/DPsmpPJPh4w)

## Recruiter Tools

### Recruiter-Friendly Dashboard

A recruiter-focused dashboard offers a comprehensive summary of the interview process, including candidate performance metrics such as overall score, confidence, emotional stability, and job compatibility. The dashboard incorporates bias detection tools that highlight any potential AI biases, allowing recruiters to intervene or adjust the evaluation process if needed. This transparency ensures that the evaluation remains fair and objective.

### Dashboard Information

The final dashboard provides the following information:

- **Basic Details**:
  - `Name`: Candidate's full name.
  - `Vacancy`: Position for which the candidate is interviewing.
  - `SkillsNeeded`: List of skills required for the position.

- **Scores**:
  - `EducationalBackgroundScore`: Score based on the candidate's educational qualifications.
  - `Experience`: Score based on the candidate's relevant work experience.
  - `InterpersonalCommunication`: Score based on the candidate's ability to communicate and interact effectively.
  - `TechnicalKnowledge`: Score based on the candidate's technical skills and knowledge.
  - `OverallScore`: Overall performance score of the candidate.

- **Interview Summary**:
  - `PositivePoints`: Detailed positive insights (150-200 words) with specific examples from the interview, highlighting strengths and accomplishments.
  - `NegativePoints`: Detailed areas for improvement (150-200 words) with specific examples from the interview, noting knowledge gaps or weaknesses.

- **Detailed Assessment**:
  - `RecommendationStatus`: Final recommendation (Recommended/Not Recommended/Consider).
  - `InterviewDuration`: Total duration of the interview.
  - `ConfidenceLevel`: Measure of the candidate's confidence during the interview.
  - `SkillMatchPercentage`: Percentage match between candidate's skills and job requirements.
  - `PersonalityTraits`: List of observed personality traits.
  - `TechnicalSkillsBreakdown`: Detailed assessment of individual technical skills with proficiency levels.

- **Recommended Learning Paths**:
  - List of suggested areas for improvement with specific learning resources.

- **Culture Fit Analysis**:
  - `TeamworkScore`: Assessment of candidate's teamwork abilities.
  - `AdaptabilityScore`: Assessment of candidate's adaptability to new environments.
  - `Summary`: Overview of the candidate's potential cultural fit with the organization.

### Automated Resume Screening

Integrated with Applicant Tracking Systems (ATS), the platform automates resume screening to pre-filter candidates based on relevant skills and qualifications. This step significantly reduces the workload on recruiters by automatically identifying the most qualified candidates for further evaluation.

### Tailored Questionnaires

The system dynamically generates interview questions tailored to the specific job role and the candidate’s unique profile. Using insights from resume analysis and real-time interactions, the platform customises questions to focus on relevant skills, ensuring each candidate experiences a highly targeted and relevant interview process.


## Upcoming Features 
- **Facial Expression and Body Posture Analysis**: Integrating video feed to analyze facial expressions and body posture, providing insights into the interviewee's emotions and confidence levels.
- **Unfair Detection**: Implementing eyeball tracking to detect any unfair practices during the interview.
- **Audio Pitch Analysis**: Utilizing audio pitch to assess the interviewee's emotions and confidence.

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes. We appreciate your efforts to improve this project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgements
- This was a team project for SIH.
- [Groq](https://groq.com) for providing the LLM API.
- [Eleven Labs](https://elevenlabs.io) for providing the voice synthesis API tailored for an Indian voice.
- [Cloudinary](https://cloudinary.com) for providing media management and optimization services.
- [MongoDB](https://www.mongodb.com) for providing the database solution for efficient data storage and retrieval.
- [LangGraph](https://github.com/langchain-ai/langgraph) for providing the framework to build and orchestrate the AI agent workflow.
