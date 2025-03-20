from PyPDF2 import PdfReader
import json

def extract_questions_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    questions = []
    current_question = None
    
    for page in reader.pages:
        text = page.extract_text()
        if text:
            # Split the text into lines
            lines = text.split('\n')
            for line in lines:
                line = line.strip()
                
                # Identify questions (ending with ? or :)
                if line and (line[-1] in ['?', ':']):
                    if current_question:  # If there's a current question, save it
                        questions.append(current_question)
                    current_question = {"id": len(questions) + 1, "question": line, "options": []}
                
                # Identify options (assuming they start with A), B), C), D), etc.)
                elif current_question and (line.startswith("A)") or line.startswith("B)") or line.startswith("C)") or line.startswith("D)")):
                    current_question["options"].append(line)
                
                # Handle cases where options might not start with A), B), etc.
                elif current_question and (line.startswith("1)") or line.startswith("2)")):  # Example for numbered options
                    current_question["options"].append(line)

    if current_question:  # Add the last question if it exists
        questions.append(current_question)
    
    return questions

def create_mock_test(questions):
    mock_test = {
        "title": "Mock Test Sample Paper",
        "questions": []
    }
    
    for question in questions:
        mock_test["questions"].append({
            "id": question["id"],
            "question": question["question"],
            "options": question["options"]  # Include options here
        })
    
    return mock_test

def save_mock_test_to_json(mock_test, output_path):
    with open(output_path, 'w') as json_file:
        json.dump(mock_test, json_file, indent=4)

# Main execution
pdf_path = "C:\\Users\\hp\\Desktop\\mockt.pdf" # Use double backslashes # Path to your PDF file
output_path = 'mock_test.json'  # Output JSON file

# Extract questions from PDF
questions = extract_questions_from_pdf(pdf_path)

# Create mock test structure
mock_test = create_mock_test(questions)

# Save mock test to JSON file
save_mock_test_to_json(mock_test, output_path)

print(f"Mock test created with {len(questions)} questions and saved to {output_path}.")