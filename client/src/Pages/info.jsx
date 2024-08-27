import React from 'react'
import './info.css'

const info = () => {
  return (
    <div className='Info'>
        <div class="container">
        <header className='header'>
            <h1>Welcome to Aro! Your Health Companion</h1>
        </header>

        <section class="what-is-aro">
            <h2>What is Aro?</h2>
            <p>Aro is an intelligent healthcare chatbot designed to assist you with your health-related queries and provide guidance on various medical topics. Whether you need information about symptoms, advice on lifestyle changes, or details about medications, Aro is here to help 24/7.</p>
        </section>

        <section class="features">
            <h2>Features of Aro</h2>
            <ul>
                <li><strong>Symptom Checker:</strong> Enter your symptoms, and Aro will help you understand potential causes and advise on when to seek medical attention.</li>
                <li><strong>Medication Information:</strong> Get details about your prescribed medications, including dosage, side effects, and interactions.</li>
                <li><strong>Healthy Living Tips:</strong> Receive personalized advice on diet, exercise, mental health, and more to maintain a healthy lifestyle.</li>
                <li><strong>Appointment Reminders:</strong> Aro can remind you of upcoming medical appointments and provide tips on preparing for them.</li>
                <li><strong>Mental Health Support:</strong> Access resources and guidance for mental well-being, including stress management and mindfulness practices.</li>
            </ul>
        </section>

        <section class="how-it-works">
            <h2>How Aro Works</h2>
            <ol>
                <li><strong>Ask:</strong> Simply type your question or describe your symptoms in the chat box.</li>
                <li><strong>Analyze:</strong> Aro processes your input using advanced AI algorithms to understand your needs.</li>
                <li><strong>Assist:</strong> Aro provides accurate and relevant information based on trusted medical sources.</li>
            </ol>
        </section>

        <section class="why-choose-aro">
            <h2>Why Choose Aro?</h2>
            <ul>
                <li><strong>Accessible Anytime:</strong> Aro is available 24/7, making it easy to get health information whenever you need it.</li>
                <li><strong>Privacy First:</strong> Your data is secure with Aro, ensuring confidentiality and peace of mind.</li>
            </ul>
        </section>
    </div>
    </div>
  )
}

export default info