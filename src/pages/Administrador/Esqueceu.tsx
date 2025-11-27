import { useState } from 'react';
import '../styles/Esqueceu.css';
import logoAffectus from '../../assets/logo.png';

type Step = 'email' | 'code' | 'newPassword' | 'success';

export default function Esqueceu() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    setLoading(true);
    
    // Simula envio de código (aqui você integraria com sua API)
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 1500);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (code.length !== 6) {
      setError('O código deve ter 6 dígitos');
      return;
    }

    setLoading(true);
    
    // Simula verificação do código
    setTimeout(() => {
      setLoading(false);
      setStep('newPassword');
    }, 1500);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (newPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    
    // Simula redefinição de senha
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  const handleBackToLogin = () => {
    // Aqui você navegaria de volta para a tela de login
    window.location.href = '/Login';
  };

  return (
    <div className="esqueceu-container">
      <div className="esqueceu-left">
        <div className="esqueceu-blur"></div>
      </div>
      
      <div className="esqueceu-right">
        <div className="esqueceu-card">
          <img src={logoAffectus} alt="Affectus Logo" className="esqueceu-logo" />
          
          {step === 'email' && (
            <>
              <h1 className="esqueceu-title">RECUPERAR SENHA</h1>
              <p className="esqueceu-subtitle">
                Digite seu e-mail e enviaremos um código de verificação.
              </p>
              
              <form onSubmit={handleSendCode} className="esqueceu-form">
                <div className="esqueceu-input-group">
                  <label htmlFor="email" className="esqueceu-label">E-MAIL:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="esqueceu-input"
                    placeholder="seu.email@exemplo.com"
                    disabled={loading}
                  />
                </div>

                {error && <div className="esqueceu-error">{error}</div>}

                <button 
                  type="submit" 
                  className="esqueceu-button"
                  disabled={loading}
                >
                  {loading ? 'ENVIANDO...' : 'ENVIAR CÓDIGO'}
                </button>

                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="esqueceu-link-button"
                >
                  Voltar para o login
                </button>
              </form>
            </>
          )}

          {step === 'code' && (
            <>
              <h1 className="esqueceu-title">Verificar Código</h1>
              <p className="esqueceu-subtitle">
                Enviamos um código de 6 dígitos para<br />
                <strong>{email}</strong>
              </p>
              
              <form onSubmit={handleVerifyCode} className="esqueceu-form">
                <div className="esqueceu-input-group">
                  <label htmlFor="code" className="esqueceu-label">CÓDIGO DE VERIFICAÇÃO:</label>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="esqueceu-input esqueceu-input-code"
                    placeholder="000000"
                    maxLength={6}
                    disabled={loading}
                  />
                </div>

                {error && <div className="esqueceu-error">{error}</div>}

                <button 
                  type="submit" 
                  className="esqueceu-button"
                  disabled={loading}
                >
                  {loading ? 'VERIFICANDO...' : 'VERIFICAR CÓDIGO'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="esqueceu-link-button"
                >
                  Reenviar código
                </button>
              </form>
            </>
          )}

          {step === 'newPassword' && (
            <>
              <h1 className="esqueceu-title">Nova Senha</h1>
              <p className="esqueceu-subtitle">
                Defina sua nova senha de acesso
              </p>
              
              <form onSubmit={handleResetPassword} className="esqueceu-form">
                <div className="esqueceu-input-group">
                  <label htmlFor="newPassword" className="esqueceu-label">NOVA SENHA:</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="esqueceu-input"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>

                <div className="esqueceu-input-group">
                  <label htmlFor="confirmPassword" className="esqueceu-label">CONFIRMAR SENHA:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="esqueceu-input"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>

                {error && <div className="esqueceu-error">{error}</div>}

                <button 
                  type="submit" 
                  className="esqueceu-button"
                  disabled={loading}
                >
                  {loading ? 'REDEFININDO...' : 'REDEFINIR SENHA'}
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <>
              <div className="esqueceu-success-icon">✓</div>
              <h1 className="esqueceu-title">Senha Redefinida!</h1>
              <p className="esqueceu-subtitle">
                Sua senha foi alterada com sucesso.<br />
                Você já pode fazer login com sua nova senha.
              </p>
              
              <button 
                onClick={handleBackToLogin}
                className="esqueceu-button"
              >
                IR PARA O LOGIN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
