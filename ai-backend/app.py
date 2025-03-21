from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

STUDY_RECOMMENDATIONS = [
    "Revise from NCERT textbooks and solve all back exercises.",
    "Watch Khan Academy videos for a better understanding of key concepts.",
    "Practice previous years' question papers to understand exam patterns.",
    "Create a summary sheet with formulas and important concepts for quick revision.",
    "Use mnemonic techniques to remember complex terms and definitions.",
    "Spend at least 30 minutes daily solving numerical problems.",
    "Join online discussion forums to clarify doubts with peers.",
    "Read topic summaries from reliable study guides like HC Verma or RS Aggarwal.",
    "Use flashcards to memorize important dates, formulas, or definitions.",
    "Write down key concepts in your own words to reinforce understanding.",
    "Solve at least 5-10 extra problems from reference books for deeper insights.",
    "Watch YouTube tutorials from IIT professors for advanced problem-solving techniques.",
    "Attempt timed quizzes to improve speed and accuracy.",
    "Group study with friends to discuss and explain difficult topics to each other.",
    "Follow a strict study timetable with breaks to avoid burnout.",
    "Use spaced repetition to revise weak topics multiple times before exams.",
    "Try explaining concepts to a friend or family member to strengthen your understanding.",
    "Make a mind map or diagram to visualize and connect concepts.",
    "Practice derivations and proofs rather than just memorizing them.",
    "Refer to online resources like Coursera, Udemy, or EdX for additional explanations.",
    "Stay updated with current affairs and general knowledge for subjects like History & Geography.",
    "Attempt interactive learning apps like Byju’s, Unacademy, or Toppr for concept clarity.",
    "Take short breaks between study sessions to retain focus and productivity.",
    "Use online calculators and simulators to experiment with formulas and concepts.",
    "Make audio recordings of important topics and listen to them while traveling.",
    "Write one-page summaries after finishing each chapter.",
    "Practice writing structured answers for subjective questions.",
    "Create daily, weekly, and monthly goals to track progress.",
    "Focus more on high-weightage topics as per previous years' question papers.",
    "Do yoga or meditation to improve concentration and reduce stress before studying."
]

@app.route('/analyze', methods=['POST'])
def analyze_performance():
    try:
        data = request.get_json()
        marks_data = data.get('marks', {})  # Example: {"math": {"marks": 10, "outOf": 20}, "science": {"marks": 15, "outOf": 25}}

        if not isinstance(marks_data, dict) or not marks_data:
            return jsonify({"error": "Invalid marks format. Expected a dictionary."}), 400

        weak_subjects = {}
        used_recommendations = set()
        total_percentage = 0
        num_subjects = 0
        has_weak_subjects = False  # Flag to check if any subject is below 60%

        for subject, scores in marks_data.items():
            if not isinstance(scores, dict) or "marks" not in scores or "outOf" not in scores:
                return jsonify({"error": f"Invalid format for subject '{subject}'. Expected dictionary with 'marks' and 'outOf' keys."}), 400

            marks = scores.get("marks", 0)
            out_of = scores.get("outOf", 1)  # Avoid division by zero
            percentage = (marks / out_of) * 100  

            total_percentage += percentage
            num_subjects += 1

            if percentage < 60:  # Identify weak subjects
                has_weak_subjects = True
                available_recommendations = list(set(STUDY_RECOMMENDATIONS) - used_recommendations)
                if not available_recommendations:
                    used_recommendations.clear()
                    available_recommendations = STUDY_RECOMMENDATIONS
                
                recommendation = random.choice(available_recommendations)
                used_recommendations.add(recommendation)
                weak_subjects[subject] = {
                    "marks": marks,
                    "outOf": out_of,
                    "percentage": round(percentage, 2),
                    "recommendation": recommendation
                }

        average_percentage = total_percentage / num_subjects if num_subjects > 0 else 0
        suggestion = "Needs Improvement" if average_percentage < 50 else "Good Performance"

        response = {
            "suggestion": suggestion
        }

        # If no weak subjects, replace weak_subjects key with positive message
        if has_weak_subjects:
            response["weak_subjects"] = weak_subjects
        else:
            response["message"] = "No major concerns! The child is performing well. Aim for even greater achievements!"

        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)