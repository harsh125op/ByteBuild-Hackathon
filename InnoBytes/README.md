  InnoBytes
  #python
  import PyPDF2
from fpdf import FPDF

# Function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    with open(pdf_file, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = []
        for page in reader.pages:
            text.append(page.extract_text())
        return "\n".join(text)

# Function to create mock test paper PDF
def create_mock_test_paper(text, output_file):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # Split the text into lines and add to PDF
    for line in text.split('\n'):
        pdf.cell(0, 10, line, ln=True)

    pdf.output(output_file)

# Main function to run the conversion
def main():
    input_pdf = 'your_input_file.pdf'  # Replace with your PDF file path
    output_pdf = 'mock_test_paper.pdf'  # Output file name

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(input_pdf)

    # Create mock test paper PDF
    create_mock_test_paper(extracted_text, output_pdf)

    print(f'Mock test paper created: {output_pdf}')

# Call the main function
if name == "main":
    main()
def main2()
