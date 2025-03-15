import React, { useState, useEffect } from "react";
import "./styles.css";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export default function App() {
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en-US");
  const [outputLanguage, setOutputLanguage] = useState("es");

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = inputLanguage;

      recognitionInstance.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + " ";
          }
        }
        if (transcript) {
          setInputText((prevText) => prevText + " " + transcript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);

      // Cleanup function to stop recognition on unmount
      return () => {
        recognitionInstance.abort();
      };
    } else {
      alert(
        "Your browser does not support speech recognition. Please try Chrome or Edge."
      );
    }
  }, []);

  // Available languages
  const languages = [
    { code: "en-US", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh-CN", name: "Chinese" },
  ];

  const startRecording = () => {
    if (recognition) {
      recognition.lang = inputLanguage;
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  // OpenAI Translation API (Replace with your OpenAI API key)
  const translateText = async () => {
    if (!inputText) return;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4-turbo",
            messages: [
              {
                role: "system",
                content: `You are a professional healthcare translation assistant. Translate the following text from ${inputLanguage} to ${outputLanguage}, ensuring medical terms, abbreviations and context are accurately preserved. Use medically appropriate terminology and avoid literal translations that may change the meaning in a clinical setting`,
              },
              { role: "user", content: inputText },
            ],
            temperature: 0.3,
          }),
        }
      );

      const data = await response.json();
      setTranslatedText(data.choices[0].message.content);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation failed.");
    }
  };

  useEffect(() => {
    if (inputText) {
      translateText();
    }
  }, [inputText]);

  const speakTranslation = () => {
    if (!translatedText) return;
    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.lang = outputLanguage;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Healthcare Translation App</h1>

        <div className="language-selectors">
          <div className="selector">
            <label>Input Language:</label>
            <select
              value={inputLanguage}
              onChange={(e) => setInputLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="selector">
            <label>Output Language:</label>
            <select
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className={`record-button ${isRecording ? "recording" : ""}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

        <div className="transcripts">
          <div className="transcript">
            <h3>Original Text</h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Speak or type here..."
            />
          </div>

          <div className="transcript">
            <h3>Translated Text</h3>
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
            />
            <button
              className="speak-button"
              onClick={speakTranslation}
              disabled={!translatedText}
            >
              Speak Translation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
