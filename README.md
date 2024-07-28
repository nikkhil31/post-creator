# Post Creator

Post Creator is a tool for generating visually engaging social media content. By simply entering a keyword, users can create images for posts (1080 x 1080) and stories (1080 x 1920). The app leverages advanced technologies like OpenAI and Google APIs to streamline the content creation process.

## How to Run It Locally

To run Post Creator locally, follow these steps:

### 1. Get All the APIs

Obtain API keys and credentials for the following services:
- Google's Custom Search JSON API
- OpenAI's API
- ImageKit.io

### 2. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/nikkhil31/post-creator.git
```

### 3. **Copy the Environment Variables**:
   - Copy the environment variables file to create a new `.env` file:

     ```bash
     cp .env.example .env
     ```

   - Open the `.env` file and add your API keys and other necessary environment variables.

### 4. **Install Dependencies**:
   - Navigate to the project directory and install the required dependencies:

     ```bash
     npm install
     ```

### 5. **Run the Development Server**:
   - Start the development server using the following command:

     ```bash
     npm run dev
     ```

   - You can now access the app in your browser at [http://localhost:3000](http://localhost:3000).
