import { useState, useEffect } from 'react';
import '../styles/Agendamentos.css';
import { Calendar, Clock, User, Phone, FileText, Send, Plus, X, Edit, Trash2, Search, Menu, ArrowLeft, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import pcImage from '../../assets/pc.jpg';
import { useNavigate } from 'react-router-dom'; // 👈 Import

interface Agendamento {
  id: string;
  paciente: string;
  telefone: string;
  procedimento: string;
  data: string;
  horario: string;
  instrucoes: string;
  observacoes: string;
}

export default function Agendamentos() {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [agendamentoEditando, setAgendamentoEditando] = useState<Agendamento | null>(null);
  const [busca, setBusca] = useState('');
  const [sidebarAberta, setSidebarAberta] = useState(true);
  
  const [formulario, setFormulario] = useState({
    paciente: '',
    telefone: '',
    procedimento: '',
    data: '',
    horario: '',
    instrucoes: '',
    observacoes: ''
  });

  const procedimentos = [
    'Consulta de Avaliação',
    'Limpeza e Profilaxia',
    'Restauração',
    'Tratamento de Canal',
    'Extração',
    'Clareamento Dental',
    'Aplicação de Flúor',
    'Prótese Dentária',
    'Implante Dentário',
    'Ortodontia',
    'Periodontia',
    'Emergência'
  ];

  const horariosDisponiveis = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Carregar agendamentos do localStorage
  useEffect(() => {
    const agendamentosSalvos = localStorage.getItem('agendamentos_affectus');
    if (agendamentosSalvos) {
      setAgendamentos(JSON.parse(agendamentosSalvos));
    }
  }, []);

  // Salvar agendamentos no localStorage
  useEffect(() => {
    localStorage.setItem('agendamentos_affectus', JSON.stringify(agendamentos));
  }, [agendamentos]);

  const getDiasNoMes = (data: Date) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasAnteriores = primeiroDia.getDay();
    const totalDias = ultimoDia.getDate();
    
    const dias = [];
    
    // Dias do mês anterior
    for (let i = diasAnteriores - 1; i >= 0; i--) {
      const dia = new Date(ano, mes, -i);
      dias.push({ data: dia, mesAtual: false });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= totalDias; i++) {
      const dia = new Date(ano, mes, i);
      dias.push({ data: dia, mesAtual: true });
    }
    
    // Completar a grade com dias do próximo mês
    const diasRestantes = 42 - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      const dia = new Date(ano, mes + 1, i);
      dias.push({ data: dia, mesAtual: false });
    }
    
    return dias;
  };

  const mesAnterior = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1));
  };

  const proximoMes = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1));
  };

  const formatarData = (data: Date) => {
    return data.toISOString().split('T')[0];
  };

  const getAgendamentosNoDia = (data: Date) => {
    const dataFormatada = formatarData(data);
    return agendamentos.filter(ag => ag.data === dataFormatada);
  };

  const selecionarDia = (data: Date) => {
    setDiaSelecionado(data);
    setFormulario({ ...formulario, data: formatarData(data) });
  };

  const abrirFormulario = () => {
    setMostrarFormulario(true);
    setAgendamentoEditando(null);
    setFormulario({
      paciente: '',
      telefone: '',
      procedimento: '',
      data: diaSelecionado ? formatarData(diaSelecionado) : '',
      horario: '',
      instrucoes: 'Chegar 10 minutos antes do horário agendado. Trazer documentos e exames anteriores.',
      observacoes: ''
    });
  };

  const editarAgendamento = (agendamento: Agendamento) => {
    setAgendamentoEditando(agendamento);
    setFormulario({
      paciente: agendamento.paciente,
      telefone: agendamento.telefone,
      procedimento: agendamento.procedimento,
      data: agendamento.data,
      horario: agendamento.horario,
      instrucoes: agendamento.instrucoes,
      observacoes: agendamento.observacoes
    });
    setMostrarFormulario(true);
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setAgendamentoEditando(null);
    setFormulario({
      paciente: '',
      telefone: '',
      procedimento: '',
      data: '',
      horario: '',
      instrucoes: '',
      observacoes: ''
    });
  };

  const salvarAgendamento = () => {
    if (!formulario.paciente || !formulario.telefone || !formulario.procedimento || 
        !formulario.data || !formulario.horario) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (agendamentoEditando) {
      // Editar agendamento existente
      setAgendamentos(agendamentos.map(ag => 
        ag.id === agendamentoEditando.id 
          ? { ...formulario, id: ag.id }
          : ag
      ));
    } else {
      // Criar novo agendamento
      const novoAgendamento: Agendamento = {
        id: Date.now().toString(),
        ...formulario
      };
      setAgendamentos([...agendamentos, novoAgendamento]);
      
      // Enviar mensagem automaticamente
      enviarMensagem(novoAgendamento);
    }

    cancelarFormulario();
  };

  const excluirAgendamento = (id: string) => {
    if (confirm('Deseja realmente cancelar este agendamento?')) {
      setAgendamentos(agendamentos.filter(ag => ag.id !== id));
    }
  };

  const enviarMensagem = (agendamento: Agendamento) => {
    const data = new Date(agendamento.data + 'T00:00:00');
    const dataFormatada = data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });

    const mensagem = `
🦷 *Consultório Dr. Paulo César*
📋 Plataforma Affectus

Olá ${agendamento.paciente}! ✨

Seu agendamento foi confirmado com sucesso!

📅 *Data:* ${dataFormatada}
🕐 *Horário:* ${agendamento.horario}
💉 *Procedimento:* ${agendamento.procedimento}

📌 *Instruções Importantes:*
${agendamento.instrucoes}

${agendamento.observacoes ? `📝 *Observações:*\n${agendamento.observacoes}\n\n` : ''}
📍 Endereço: [Inserir endereço do consultório]
📞 Contato: [Inserir telefone do consultório]

Em caso de imprevisto, entre em contato com antecedência para reagendar.

Aguardamos você! 😊
`.trim();

    // Remover caracteres especiais do telefone
    const telefoneFormatado = agendamento.telefone.replace(/\D/g, '');
    
    // Abrir WhatsApp Web
    const url = `https://wa.me/55${telefoneFormatado}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const horariosOcupados = diaSelecionado 
    ? getAgendamentosNoDia(diaSelecionado).map(ag => ag.horario)
    : [];

  const agendamentosFiltrados = diaSelecionado
    ? getAgendamentosNoDia(diaSelecionado).filter(ag =>
        ag.paciente.toLowerCase().includes(busca.toLowerCase()) ||
        ag.procedimento.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  const mesesNomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const agendamentosHoje = getAgendamentosNoDia(new Date()).length;

 const navigate = useNavigate(); // 👈 Inicializa o hook

  const voltarParaDashboard = () => {
    navigate('/DashboardAdmin'); // 👈 Navega para o Dashboard Admin
  };
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarAberta ? 'aberta' : 'fechada'}`}>
        <div className="sidebar-content">
          <button 
            className="sidebar-toggle" 
            onClick={() => setSidebarAberta(!sidebarAberta)}
            title={sidebarAberta ? 'Fechar menu' : 'Abrir menu'}
          >
            {sidebarAberta ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          <div className="sidebar-perfil">
            <img src={pcImage} alt="Dr. Paulo César" className="perfil-foto" />
            {sidebarAberta && (
              <div className="perfil-info">
                <h3>Dr. Paulo César</h3>
                <p>Cirurgião Dentista</p>
                <p>CRO MG-CD-42-292</p>
              </div>
            )}
          </div>

          {sidebarAberta && (
            <button 
              className="btn-voltar" 
              onClick={voltarParaDashboard}
              title="Voltar para a Dashboard"
            >
              <ArrowLeft size={20} />
              <span>VOLTAR PARA A DASHBOARD</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header Moderno */}
        <header className="app-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarAberta(!sidebarAberta)}
            >
              <Menu size={24} />
            </button>
            <div className="header-title-section">
              <h1>MEUS AGENDAMENTOS</h1>
              <p>Paulo, aqui estão seus agendamentos. Escolha uma data para visualizar seus horários ou marcar um novo atendimento.</p>
            </div>
   
        
            <button className="notification-btn">
              <Bell size={20} />
              {agendamentosHoje > 0 && <span className="notification-dot"></span>}
            </button>
          </div>
        </header>

        <div className="agendamentos-content">
          {/* Calendário */}
          <div className="calendario-section">
            <div className="calendario-header">
              <button className="btn-nav" onClick={mesAnterior}>
                <ChevronLeft size={20} />
              </button>
              <h2>{mesesNomes[mesAtual.getMonth()]} {mesAtual.getFullYear()}</h2>
              <button className="btn-nav" onClick={proximoMes}>
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="calendario-grid">
              {diasSemana.map(dia => (
                <div key={dia} className="dia-semana">{dia}</div>
              ))}
              
              {getDiasNoMes(mesAtual).map(({ data, mesAtual: isAtual }, index) => {
                const agendamentosNoDia = getAgendamentosNoDia(data);
                const isHoje = formatarData(data) === formatarData(new Date());
                const isSelecionado = diaSelecionado && formatarData(data) === formatarData(diaSelecionado);
                
                return (
                  <div
                    key={index}
                    className={`dia-celula ${!isAtual ? 'outro-mes' : ''} ${isHoje ? 'hoje' : ''} ${isSelecionado ? 'selecionado' : ''} ${agendamentosNoDia.length > 0 ? 'tem-agendamento' : ''}`}
                    onClick={() => isAtual && selecionarDia(data)}
                  >
                    <span className="dia-numero">{data.getDate()}</span>
                    {agendamentosNoDia.length > 0 && (
                      <span className="indicador-agendamento">{agendamentosNoDia.length}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Agendamentos do Dia */}
          <div className="agendamentos-section">
            {diaSelecionado ? (
              <>
                <div className="section-header">
                  <div>
                    <h2>
                      {diaSelecionado.toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </h2>
                    <p>{agendamentosFiltrados.length} agendamento(s)</p>
                  </div>
                  <button className="btn-primary" onClick={abrirFormulario}>
                    <Plus size={20} />
                    Novo Agendamento
                  </button>
                </div>

                {agendamentosFiltrados.length > 0 && (
                  <div className="busca-container">
                    <Search size={20} />
                    <input
                      type="text"
                      placeholder="Buscar por paciente ou procedimento..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="input-busca"
                    />
                  </div>
                )}

                <div className="agendamentos-lista">
                  {agendamentosFiltrados.length === 0 ? (
                    <div className="vazio">
                      <Calendar size={48} />
                      <h3>Nenhum agendamento para este dia</h3>
                      <p>Clique no botão acima para adicionar um novo agendamento</p>
                      <button className="btn-secondary" onClick={abrirFormulario}>
                        Adicionar Agendamento
                      </button>
                    </div>
                  ) : (
                    agendamentosFiltrados
                      .sort((a, b) => a.horario.localeCompare(b.horario))
                      .map(agendamento => (
                        <div key={agendamento.id} className="agendamento-card">
                          <div className="card-header">
                            <div className="horario-badge">
                              <Clock size={16} />
                              {agendamento.horario}
                            </div>
                            <div className="card-acoes">
                              <button 
                                className="btn-icon"
                                onClick={() => enviarMensagem(agendamento)}
                                title="Enviar mensagem"
                              >
                                <Send size={18} />
                              </button>
                              <button 
                                className="btn-icon"
                                onClick={() => editarAgendamento(agendamento)}
                                title="Editar"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                className="btn-icon btn-delete"
                                onClick={() => excluirAgendamento(agendamento.id)}
                                title="Cancelar"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          <div className="card-content">
                            <div className="info-row">
                              <User size={18} />
                              <div>
                                <span className="info-label">Paciente</span>
                                <span className="info-valor">{agendamento.paciente}</span>
                              </div>
                            </div>

                            <div className="info-row">
                              <Phone size={18} />
                              <div>
                                <span className="info-label">Telefone</span>
                                <span className="info-valor">{agendamento.telefone}</span>
                              </div>
                            </div>

                            <div className="info-row">
                              <FileText size={18} />
                              <div>
                                <span className="info-label">Procedimento</span>
                                <span className="info-valor procedimento">{agendamento.procedimento}</span>
                              </div>
                            </div>

                            {agendamento.instrucoes && (
                              <div className="instrucoes-box">
                                <strong>Instruções:</strong>
                                <p>{agendamento.instrucoes}</p>
                              </div>
                            )}

                            {agendamento.observacoes && (
                              <div className="observacoes-box">
                                <strong>Observações:</strong>
                                <p>{agendamento.observacoes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </>
            ) : (
              <div className="selecione-dia">
                <Calendar size={64} />
                <h3>Selecione um dia no calendário</h3>
                <p>Clique em uma data para visualizar ou adicionar agendamentos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal do Formulário */}
      {mostrarFormulario && (
        <div className="modal-overlay" onClick={cancelarFormulario}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{agendamentoEditando ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
              <button className="btn-close" onClick={cancelarFormulario}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Paciente *</label>
                <input
                  type="text"
                  placeholder="Nome completo do paciente"
                  value={formulario.paciente}
                  onChange={(e) => setFormulario({ ...formulario, paciente: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Telefone (WhatsApp) *</label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formulario.telefone}
                  onChange={(e) => setFormulario({ ...formulario, telefone: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Procedimento *</label>
                <select
                  value={formulario.procedimento}
                  onChange={(e) => setFormulario({ ...formulario, procedimento: e.target.value })}
                  className="input-field"
                >
                  <option value="">Selecione o procedimento</option>
                  {procedimentos.map(proc => (
                    <option key={proc} value={proc}>{proc}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data *</label>
                  <input
                    type="date"
                    value={formulario.data}
                    onChange={(e) => setFormulario({ ...formulario, data: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Horário *</label>
                  <select
                    value={formulario.horario}
                    onChange={(e) => setFormulario({ ...formulario, horario: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Selecione o horário</option>
                    {horariosDisponiveis.map(horario => (
                      <option 
                        key={horario} 
                        value={horario}
                        disabled={horariosOcupados.includes(horario) && agendamentoEditando?.horario !== horario}
                      >
                        {horario} {horariosOcupados.includes(horario) && agendamentoEditando?.horario !== horario ? '(Ocupado)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Instruções para o Paciente</label>
                <textarea
                  placeholder="Instruções importantes para o paciente..."
                  value={formulario.instrucoes}
                  onChange={(e) => setFormulario({ ...formulario, instrucoes: e.target.value })}
                  className="input-field textarea"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Observações Internas</label>
                <textarea
                  placeholder="Observações adicionais (não serão enviadas na mensagem automática)"
                  value={formulario.observacoes}
                  onChange={(e) => setFormulario({ ...formulario, observacoes: e.target.value })}
                  className="input-field textarea"
                  rows={2}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={cancelarFormulario}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={salvarAgendamento}>
                {agendamentoEditando ? 'Salvar Alterações' : 'Agendar e Enviar Mensagem'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
