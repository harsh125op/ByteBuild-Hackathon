import random
import numpy as np
import streamlit as st
import json
import pandas as pd
import plotly.express as px
from textblob import TextBlob
import stripe




def load_keywords():
    """Loads predefined keywords and their corresponding website templates from a JSON file."""
    try:
        with open("keywords.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def generate_website_template(prompt):
    """Generates a basic HTML template based on the prompt."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>AI Generated Website</title>
        <style>
            body {{ font-family: Arial, sans-serif; text-align: center; margin: 50px; }}
            h1 {{ color: #333; }}
        </style>
    </head>
    <body>
        <h1>Welcome to Your {prompt} Website</h1>
        <p>This is an auto-generated website template.</p>
    </body>
    </html>
    """

def setup_page():
    """Sets up the Streamlit page configuration."""
    st.set_page_config(page_title='BizBoost - Digital Growth for Small Businesses', layout='wide')

def sidebar_navigation():
    """Creates a sidebar menu for navigation."""
    st.sidebar.title("BizBoost Navigation")
    return st.sidebar.radio("Go to", [
        "Home", "Website Builder", "Marketing Assistant", "Social Media & Ads", 
        "SEO & Content", "E-Commerce", "Analytics", "Customer Engagement"
    ])

def home_page():
    """Displays the home page."""
    st.title("Welcome to BizBoost 🚀")
    st.write("Empowering Small Businesses with Digital Growth")

def website_builder():
    """Website builder page allowing users to generate website templates."""
    st.title("No-Code Website Builder 🏗️")
    st.write("Easily create and customize your business website.")
    
    keywords = load_keywords()
    keyword = st.sidebar.selectbox("Choose a Keyword", list(keywords.keys()) + ["Custom"])
    
    if keyword != "Custom":
        prompt = keywords[keyword]
    else:
        website_type = st.selectbox("Choose Website Type", ["Portfolio", "Business", "Blog", "Landing Page"])
        theme = st.selectbox("Choose Theme", ["Light", "Dark", "Modern", "Minimal"])
        description = st.text_area("Describe Your Website", "A professional website with a clean layout.")
        prompt = f"{website_type} website with a {theme} theme. {description}"
    
    if st.button("Generate Website"):
        st.success("Generating website...")
        html_code = generate_website_template(prompt)
        st.code(html_code, language='html')
        st.download_button("Download HTML File", html_code, "ai_generated_website.html", "text/html")

def marketing_assistant():
    """Displays the Marketing Assistant page with Google Analytics integration."""
    st.title("Marketing Assistant 📈")
    st.write("Get AI-powered insights and strategies to boost your business.")
    
    tracking_id = st.text_input("Enter Your Google Analytics Tracking ID (GA4 or UA-)")
    
    if tracking_id:
        if tracking_id.startswith("G-") or tracking_id.startswith("UA-"):
            analytics_script = f"""
            <script async src='https://www.googletagmanager.com/gtag/js?id={tracking_id}'></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){{ dataLayer.push(arguments); }}
                gtag('js', new Date());
                gtag('config', '{tracking_id}');
            </script>
            """
            st.code(analytics_script, language='html')
            st.write("Copy and paste the above script into the `<head>` section of your website to enable Google Analytics tracking.")
        else:
            st.error("Invalid Tracking ID. It should start with 'G-' (GA4) or 'UA-' (Universal Analytics).")

def social_media_ads():
    """Displays the Social Media & Ads page."""
    st.title("Social Media & Ads 📢")
    st.write("Automate and optimize your social media campaigns.")
    
    platform = st.selectbox("Select Ad Platform", ["Facebook", "Instagram", "Google Ads", "Twitter"])
    budget = st.number_input("Enter Budget ($)", min_value=10, step=10)
    ad_copy = st.text_area("Enter Your Ad Copy", "Boost your business with our AI-powered solutions!")
    
    if st.button("Generate Ad Campaign"):
        st.success(f"Generating {platform} ad campaign...")
        st.write("### Ad Campaign Details:")
        st.write(f"**Platform:** {platform}")
        st.write(f"**Budget:** ${budget}")
        st.write(f"**Ad Copy:** {ad_copy}")
        st.write("AI-optimized targeting and scheduling will be applied.")

def seo_content():
    """Displays the SEO & Content page."""
    st.title("SEO & Content ✍️")
    st.write("Enhance your online visibility with AI-driven SEO strategies.")
    
    topic = st.text_input("Enter Topic for SEO Article", placeholder="e.g., SEO Optimization Tips")
    
    sections = {
        "Understanding the Basics": [
            "- What is {topic}?",
            "- History and evolution of {topic}",
            "- Why {topic} is important in modern business"
        ],
        "Key Strategies for Success": [
            "- Essential techniques to master {topic}",
            "- How to implement {topic} effectively",
            "- Common challenges and solutions in {topic}"
        ],
        "Advanced Techniques": [
            "- Cutting-edge approaches in {topic}",
            "- Case studies of successful {topic} strategies",
            "- AI and automation in {topic}"
        ],
        "Measuring and Improving Performance": [
            "- Key performance indicators for {topic}",
            "- How to analyze and optimize {topic}",
            "- Tools and resources to track {topic} success"
        ],
        "Expert Tips & Future Trends": [
            "- Predictions for the future of {topic}",
            "- Industry expert insights on {topic}",
            "- The next big thing in {topic}"
        ]
    }
    
    if topic:
        selected_sections = random.sample(list(sections.keys()), 3)  # Select 3 random main sections
        article_content = [f"## {topic}", f"### Introduction", f"- Overview of {topic}", f"- Importance of {topic} in digital marketing"]
        
        for section in selected_sections:
            subsections = random.sample(sections[section], 2)  # Select 2 random subsections per section
            formatted_subsections = [sub.format(topic=topic) for sub in subsections]
            article_content.append(f"### {section}")
            article_content.extend(formatted_subsections)
        
        article_content.append("### Conclusion")
        article_content.append("- Summary of key takeaways")
        article_content.append(f"- Next steps to improve {topic} strategy")
        
        article_output = "\n\n".join(article_content)
        
        if st.button("Generate SEO Article"):
            st.success("SEO-optimized article generated successfully! 🚀")
            st.markdown(article_output)


# Set up Stripe API key
stripe.api_key = "sk_test_51R4a3EFpfdDlifil6XCudM4upQ3uGEsha2sI40k26J4J3AKzRpMXG4JfFf1lad3zcWR2tecya1Tt0CY6oiz3g9jf0030ZpSxND"

def process_payment(product_name, amount, currency="usd"):
    """Handles Stripe payment processing."""
    try:
        # Create a checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": currency,
                    "product_data": {
                        "name": product_name,
                    },
                    "unit_amount": int(amount * 100),  # Convert to cents
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url="https://yourwebsite.com/success",  # Replace with your success URL
            cancel_url="https://yourwebsite.com/cancel",  # Replace with your cancel URL
        )
        return session.url
    except Exception as e:
        st.error(f"⚠️ Payment failed: {str(e)}")
        return None
    
def e_commerce():
    """E-Commerce Page with Stripe Payments"""
    st.title("🛒 E-Commerce Store with Stripe Payments")

    # Sample products
    products = [
        {"name": "Wireless Earbuds", "price": 49.99},
        {"name": "Smartwatch", "price": 99.99},
        {"name": "Gaming Mouse", "price": 39.99},
        {"name": "Mechanical Keyboard", "price": 79.99},
    ]

    # Display product listings
    st.write("### 🏷️ Products Available:")
    for product in products:
        st.write(f"🔹 **{product['name']}** - 💰 ${product['price']}")
        if st.button(f"Buy {product['name']}"):
            checkout_url = process_payment(product["name"], product["price"])
            if checkout_url:
                st.success("✅ Redirecting to payment...")
                st.markdown(f"[Click here to Pay]({checkout_url})", unsafe_allow_html=True)

def analytics():
    """Displays the Analytics page."""
    st.title("Analytics 📊")
    st.write("Track and analyze business performance with AI-driven insights.")

def customer_engagement():
    """Displays customer engagement insights using dummy JSON data."""
    st.title("📊 Customer Engagement Dashboard")
    st.write("Analyze customer interactions and improve retention strategies.")
    
    # Dummy JSON Data
    data_json = '''[
        {"customer_id": 1, "name": "Alice", "purchase_frequency": 10, "total_spent": 5000, "retention_score": 85, "sentiment": "Positive"},
        {"customer_id": 2, "name": "Bob", "purchase_frequency": 6, "total_spent": 3000, "retention_score": 70, "sentiment": "Neutral"},
        {"customer_id": 3, "name": "Charlie", "purchase_frequency": 8, "total_spent": 4000, "retention_score": 80, "sentiment": "Positive"},
        {"customer_id": 4, "name": "David", "purchase_frequency": 5, "total_spent": 2000, "retention_score": 60, "sentiment": "Negative"},
        {"customer_id": 5, "name": "Eva", "purchase_frequency": 12, "total_spent": 7000, "retention_score": 90, "sentiment": "Positive"}
    ]'''
    
    df = pd.DataFrame(json.loads(data_json))
    
    # Show data preview
    st.write("### 📋 Customer Data Preview")
    st.dataframe(df)
    
    # Purchase Frequency Analysis
    st.write("### 🔄 Purchase Frequency Distribution")
    fig_freq = px.histogram(df, x='purchase_frequency', nbins=5, title="Customer Purchase Frequency", 
                            labels={'purchase_frequency': "Number of Purchases"}, color_discrete_sequence=['#636EFA'])
    st.plotly_chart(fig_freq, use_container_width=True)
    
    # Retention Score Analysis
    st.write("### 🎯 Customer Retention Score")
    fig_retention = px.pie(df, names='name', values='retention_score', title="Retention Score Distribution")
    st.plotly_chart(fig_retention, use_container_width=True)
    
    # Sentiment Analysis
    st.write("### 😀 Customer Sentiment Analysis")
    fig_sentiment = px.bar(df.groupby('sentiment').size().reset_index(name='count'), x='sentiment', y='count',
                           color='sentiment', title="Sentiment Distribution")
    st.plotly_chart(fig_sentiment, use_container_width=True)

def main():
    setup_page()
    menu = sidebar_navigation()
    
    if menu == "Home":
        home_page()
    elif menu == "Website Builder":
        website_builder()
    elif menu == "Marketing Assistant":
        marketing_assistant()
    elif menu == "Social Media & Ads":
        social_media_ads()
    elif menu == "SEO & Content":
        seo_content()
    elif menu == "E-Commerce":
        e_commerce()
    elif menu == "Analytics":
        analytics()
    elif menu == "Customer Engagement":
        customer_engagement()
    
    st.sidebar.markdown("---")
    st.sidebar.write("© 2025 BizBoost - Empowering Small Businesses")

if __name__ == "__main__":
    main()