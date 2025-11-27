import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import do hook de navegação
import { ArrowLeft } from "lucide-react";
import mascotImage from "../../assets/mascote-feedbacks.png";
import "../styles/Feedbacks.css";
import { createFeedback } from "../../services/feedbacks";

type FeedbackType = "happy" | "neutral" | "sad" | null;

export default function Feedbacks() {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate(); // 👈 Inicializa o hook

  const mapFeedbackLabel = (t: Exclude<FeedbackType, null>) =>
    t === "happy" ? "Feliz" : t === "neutral" ? "Normal" : "Triste";

  const handleFeedbackSelect = (type: FeedbackType) => {
    if (!type) return;
    setSelectedFeedback(type);
    setSending(true);
    setError(null);
    createFeedback({ tipo: mapFeedbackLabel(type) })
      .then(() => setSubmitted(true))
      .catch((e) => setError(e.message || "Falha ao enviar feedback"))
      .finally(() => setSending(false));
  };

  const handleBack = () => {
    navigate("/DashboardAdmin"); // 👈 Redireciona para DashboardAdmin
  };

  return (
    <div className="feedback-container">
      <button onClick={handleBack} className="back-button" aria-label="Voltar">
        <ArrowLeft size={32} />
      </button>

      <div className="feedback-content">
        <div className="header-section">
          <img
            src={mascotImage}
            alt="Mascote Dr. Affectus"
            className="mascot-affectus"
          />
          <div className="header-text">
            <h1 className="title">
              AMIGUINHO(A), PARABÉNS POR TER FINALIZADO O ATENDIMENTO!
            </h1>
            <h2 className="subtitle">
              COMO VOCÊ SE SENTIU NO ATENDIMENTO DE HOJE?
            </h2>
          </div>
        </div>

        <div className="feedback-box">
          <div className="teeth-container">
            {/* Dente Feliz */}
            <div className="tooth-option">
              <div
                className={`tooth happy ${
                  selectedFeedback === "happy" ? "selected" : ""
                }`}
              >
                <div className="tooth-body">
                  <div className="eyes">
                    <div className="eye happy-eye left"></div>
                    <div className="eye happy-eye right"></div>
                  </div>
                  <div className="mouth happy-mouth"></div>
                </div>
              </div>
              <button
                className={`checkbox ${
                  selectedFeedback === "happy" ? "checked" : ""
                }`}
                onClick={() => handleFeedbackSelect("happy")}
                aria-label="Feliz"
                disabled={sending}
              >
                {selectedFeedback === "happy" && (
                  <svg className="checkmark" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
              <span className="feedback-label">Feliz</span>
            </div>

            {/* Dente Neutro */}
            <div className="tooth-option">
              <div
                className={`tooth neutral ${
                  selectedFeedback === "neutral" ? "selected" : ""
                }`}
              >
                <div className="tooth-body">
                  <div className="eyes">
                    <div className="eye neutral-eye left"></div>
                    <div className="eye neutral-eye right"></div>
                  </div>
                  <div className="mouth neutral-mouth"></div>
                </div>
              </div>
              <button
                className={`checkbox ${
                  selectedFeedback === "neutral" ? "checked" : ""
                }`}
                onClick={() => handleFeedbackSelect("neutral")}
                aria-label="Normal"
                disabled={sending}
              >
                {selectedFeedback === "neutral" && (
                  <svg className="checkmark" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
              <span className="feedback-label">Normal</span>
            </div>

            {/* Dente Triste */}
            <div className="tooth-option">
              <div
                className={`tooth sad ${
                  selectedFeedback === "sad" ? "selected" : ""
                }`}
              >
                <div className="tooth-body">
                  <div className="eyes">
                    <div className="eye sad-eye left">
                      <div className="tear tear-1"></div>
                    </div>
                    <div className="eye sad-eye right">
                      <div className="tear tear-2"></div>
                    </div>
                  </div>
                  <div className="mouth sad-mouth"></div>
                </div>
              </div>
              <button
                className={`checkbox ${
                  selectedFeedback === "sad" ? "checked" : ""
                }`}
                onClick={() => handleFeedbackSelect("sad")}
                aria-label="Triste"
                disabled={sending}
              >
                {selectedFeedback === "sad" && (
                  <svg className="checkmark" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
              <span className="feedback-label">Triste</span>
            </div>
          </div>

          {error && (
            <div style={{ marginTop: 16, color: "#b91c1c", fontWeight: 600 }}>
              {error}
            </div>
          )}
          {sending && !submitted && (
            <div style={{ marginTop: 16 }}>Enviando...</div>
          )}

          <p className="footer-text">SUA OPINIÃO É MUITO IMPORTANTE!</p>
        </div>

        {submitted && (
          <div className="success-overlay">
            <div className="success-modal">
              <button
                className="close-modal"
                onClick={() => setSubmitted(false)}
                aria-label="Fechar"
              >
                ×
              </button>
              <div className="success-icon">✓</div>
              <h3 className="success-title">Feedback enviado com sucesso!</h3>
              <p className="success-text">
                Obrigado pela sua opinião! Você escolheu:{" "}
                {selectedFeedback ? mapFeedbackLabel(selectedFeedback) : ""}
              </p>
              <button
                className="success-button"
                onClick={() => setSubmitted(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
