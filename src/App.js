import logo from './inovation-logo.png'
import './App.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Api from './axios/config';
import { Row } from 'react-bootstrap';


function App() {
  const [estado, setEstado] = React.useState('vagas')
  const [vagas, setVagas] = React.useState([])
  const [candidatosQuali, setCandidatosQuali] = React.useState([])
  const [vagaId, SetVagaId] = React.useState()
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [vagaSelecionada, setVagaSelecionada] = React.useState()
  const handleVagaClick = (vagaId) => {
    setEstado('candidato');
    SetVagaId(vagaId);
    const vagaSelecionada = vagas.filter((item) => item.id == vagaId)
    setVagaSelecionada(vagaSelecionada)
    setLoading(true)
    setError(false)
    Api.get(`/candidatos-qualificados/${vagaId}/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    })
      .then((data) => {
        console.log(data.data[0])
        setCandidatosQuali(data.data[0])
        setLoading(false)

      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  };

  React.useEffect(() => {
    // GET DAS VAGAS
    Api.get(`/vagas`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    })

      .then((data) => {
        console.log(data)
        setVagas(data.data)
      })
      .catch(error => console.log(error))

  }, [])





  return (
    <body className='fundo'>

      <header class="bg-dark py-1">
        <div class="container px-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-8">
              <div class="text-center my-3">
                <img className='App-logo' src={logo} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='gradient'></div>
      <section class="py-5 border-bottom" id="features">
        <div className='container text-center'>
          <h1 className='main-title'>Inovation AI Match</h1>
          <p className='main-subtitle'><span className='laranja'>A versão focada em Matches entre currículos e vagas disponíveis.</span> <br />Selecione uma vaga e o sistema irá automaticamente selecionar, via Inteligência Artificial, um TOP 3 de melhores candidatos possíveis para aquela vaga.</p>
        </div>
        <div class="container px-5 my-5">
          <div>
            {estado === 'vagas' ? (

              <div className='d-flex flex-wrap' >
                {vagas.map((vaga) =>
                  <div class="col-md-4 mb-4 card-vaga">
                    <div class="bg-dark card h-100">
                      <div class="card-body">
                        <h2 class="card-title">{vaga.titulo}</h2>
                        <p className='first-info'>Cargo: {vaga.cargo}</p>
                        <p>Requisitos: {vaga.requisitos}</p>
                        <div onClick={() => handleVagaClick(vaga.id)} class="gradient-btn">Selecionar curriculos</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            ) : (

              <div className='vaga-selecionada' >
                <button onClick={() => setEstado('vagas')} class="gradient-btn" >Voltar</button>
                {error ? (
                  <div className="error-message"><p>Nao existe no banco de dados um curriculo correspondente com o da vaga</p></div>
                ) : (
                  <>
                    {vagaSelecionada.map((vagaSel) => (
                      <>
                        <div className='vaga-title'>
                          <h2>Titulo da vaga: {vagaSel.titulo}</h2>
                          <p className='main-subtitle'>Cargo da vaga: {vagaSel.cargo} <br /> Requisitos da vaga: {vagaSel.requisitos}</p>
                        </div>
                      </>
                    ))}

                    <div className='gradient-vaga'></div>

                    <h3>TOP 3 DE CURRÍCULOS</h3>
                    <p className='top10-subtitle'>Abaixo será carregado e exibido a lista de candidatos/currículos selecioados com Inteligência Artificial para melhor Match entre Vaga e Currículo.</p>
                    {loading ? (
                      <p className='top10-subtitle'>Carregando....</p>
                    ) : (
                      <div className="row">
                        {candidatosQuali.map((candidato, index) => (
                          <div
                            key={index}
                            className="col-md-4 mb-4 card-cv"
                          >
                            <div className="bg-dark card h-100">
                              <div className="card-body">
                                <h2 className="card-title">{candidato.nome}</h2>
                                <p>Salário: R$ {candidato.salario}</p>
                                <p>Cargo: {candidato.cargo_pretendido}</p>
                                <p>Experiencia: {candidato.experiencia}</p>
                                <p className="card-text">
                                  Sobre: {candidato.sobre}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}


              </div>
            )}


          </div>

        </div>
      </section>


      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

      <script src="js/scripts.js"></script>

      <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>

    </body>

  );
}

export default App;
