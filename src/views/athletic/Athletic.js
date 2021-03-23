import { React, useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import Game from "../../components/Game";
import api from "../../autenntication/api";
import { Link, useHistory } from "react-router-dom";
import './style.css'
import Avatar from '@material-ui/core/Avatar';

function Athletic(props) {
  const history = useHistory();
  const idChampionship = props.match.params.id;
  const idGame = props.match.params.gameId;
  const idAthlete = props.match.params.athleteId;
  const nomeObsevador = JSON.parse(localStorage.getItem("loggedInUser"));
  const [championship, setChampionship] = useState("");
  const [game, setGame] = useState({
    gameName: "",
    dateGame: "",
    category: "",
    teamA: "",
    teamB: "",
  });
  const [athletePhotos, setAthletePhotos] = useState({
    principal: "",
    others: [],
    documents: [],
  });
  const [athlete, seAthlete] = useState({
    idGame: idGame,
    idChampionship: idChampionship,
    picture: athletePhotos.principal,
    name: "",
    year: "",
    birthDate: "",
    team: "",
    shirtNumber: "",
    skillLeg: "",
    shortPass: "",
    longPass: "",
    header: "",
    position: "",
    velocity: "",
    reactionPower: "",
    mobility: "",
    finalization: "",
    comentary: "",
    contacts: [
      {
        name: "",
        phone: "",
        responsable: "",
      },
    ],
    avaliationStatus: "",
    avaliationInClub: "",
    competitionEvaluators: "",
    morePhotos: [],
    documentPhotos: [],
    userID: "",
  });
  const [pageAthlete, setPageAthlete] = useState(1);

  useEffect(async () => {
    try {
      const respChampionship = await api.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship(respChampionship.data.name);
    } catch (error) {
      console.error(error);
    }
    try {
      const respGame = await api.get(
        `${process.env.REACT_APP_API_BASE}game/${idGame}`
      );
      setGame({
        gameName: respGame.data.gameName,
        dateGame: respGame.data.dateGame.replace("Z", ""),
        category: respGame.data.category,
        teamA: respGame.data.teamA,
        teamB: respGame.data.teamB,
      });

      if (props.match.params.athleteId) {
        try {
          const respAthlete = await api.get(
            `${process.env.REACT_APP_API_BASE}athlete/${idAthlete}`
          );

          seAthlete({
            idGame: respAthlete.data.idGame,
            idChampionship: respAthlete.data.idChampionship,
            pictture: respAthlete.data.pictture,
            name: respAthlete.data.name,
            year: respAthlete.data.year,
            birthDate: respAthlete.data.birthDate,
            team: respAthlete.data.team,
            shirtNumber: respAthlete.data.shirtNumber,
            skillLeg: respAthlete.data.skillLeg,
            shortPass: respAthlete.data.shortPass,
            longPass: respAthlete.data.longPass,
            header: respAthlete.data.header,
            position: respAthlete.data.position,
            velocity: respAthlete.data.velocity,
            reactionPower: respAthlete.data.reactionPower,
            mobility: respAthlete.data.mobility,
            finalization: respAthlete.data.finalization,
            comentary: respAthlete.data.comentary,
            contacts: respAthlete.data.contacts,
            avaliationStatus: respAthlete.data.avaliationStatus,
            avaliationInClub: respAthlete.data.avaliationInClub,
            competitionEvaluators: respAthlete.data.competitionEvaluators,
            morePhotos: respAthlete.data.morePhotos,
            documentPhotos: respAthlete.data.documentPhotos,
            userID: respAthlete.data.userID,
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChange = (event) => {
    seAthlete({
      ...athlete,
      [event.target.name]: event.target.value,
    });
  };
  function changeContacts(event, typeChange, index, key, value) {
    event.preventDefault();

    if (typeChange === "change") {
      let tempListContact = athlete.contacts;

      tempListContact[index][key] = value;

      seAthlete({
        ...athlete,
        contacts: tempListContact,
      });
    }
    if (typeChange === "add") {
      let tempListContact = athlete.contacts;

      tempListContact.push({
        name: "",
        phone: "",
        responsable: "",
      });

      seAthlete({
        ...athlete,
        contacts: tempListContact,
      });
    }
    if (typeChange === "delete") {
      let tempListContact = athlete.contacts;

      tempListContact.splice(index, 1);

      seAthlete({
        ...athlete,
        contacts: tempListContact,
      });
    }
  }
  const handleChangePageAvance = () => {
    if (pageAthlete === 3) {
      return;
    }
    let newPage = pageAthlete;
    setPageAthlete(newPage + 1);
  };
  const handleChangePageRegresse = () => {
    if (pageAthlete === 1) {
      return;
    }
    let newPage = pageAthlete;
    setPageAthlete(newPage - 1);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (idAthlete) {
      console.log("atualizando");
      try {
        const respUpdateAthlete = await api.patch(
          `${process.env.REACT_APP_API_BASE}athlete/${idAthlete}`,
          athlete
        );
        console.log("atualizado");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("criando");
      try {
        const respCreateAthlete = await api.post(
          `${process.env.REACT_APP_API_BASE}athlete`,
          athlete
        );
        console.log(respCreateAthlete);
        history.push(
          `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/${respCreateAthlete.data.result._id}`
        );
        console.log("criado");
        window.location.reload(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleDelete = async () => {
    try {
      const respDeleteAthlete = await api.delete(
        `${process.env.REACT_APP_API_BASE}athlete/${idAthlete}`,
        athlete
      );
      history.push(
        `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/athlets`
      );
    } catch (error) {
      console.error(error);
    }
  };

  function saveImage(event, group) {
    event.preventDefault();

    setAthletePhotos({
      ...athletePhotos,
      [group]:
        "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
    });

    //handleSave(event);
  }

  const handleSalvarImagem = async () =>{
    
  }

  return (
    <div>
      <Inputs
        type="year"
        className="text-30px wid-90 disp-flex just-center mg-b-2"
        placeholder="Nome do Campeonato "
        name="name"
        value={championship}
        onChange={handleChange}
        disabled="disabled"
      />
      <div className="disp-flex just-end mg-b-2">
        <h4>{nomeObsevador.user.name}</h4>
      </div>
      <Game
        gameName={game.gameName}
        dateGame={game.dateGame}
        category={game.category}
        teamA={game.teamA}
        teamB={game.teamB}
        disabled={"disabled"}
        noButton={true}
      />
      <form className="disp-flex flex-direct-col">
        <h5>
          {props.location.pathname.includes("novo")
            ? "Novo Atleta"
            : "Editar Atleta"}
        </h5>
        {!idAthlete ? (
          <div>
          </div>
        ) : (
          <div className="container">
            <Avatar 
              alt="fotoAtleta"
              className="fotoAtleta"
              src="https://img.elo7.com.br/product/main/163D2EF/adesivo-de-parede-jogador-de-futebol-futebol.jpg" />
            <Inputs
              label="Img"
              type="file"
              className="disp-block"
              onChange={(event) => {
                saveImage(event, "principal");
              }}
            />
            <button className="btn btn-black" onClick={handleSalvarImagem}>Upload</button>
          </div>
        )}
        <Inputs
          label="Nome: "
          type="text"
          placeholder="Nome"
          name="name"
          value={athlete.name}
          onChange={handleChange}
        />
        <Inputs
          label="Ano: "
          placeholder="Ano de nascimento"
          type="number"
          name="year"
          value={athlete.year}
          onChange={handleChange}
        />
        <Inputs
          label="Data de nascimento: "
          type="date"
          name="birthDate"
          value={
            athlete.birthDate
              ? athlete.birthDate.split("T")[0]
              : athlete.birthDate
          }
          onChange={handleChange}
        />
        <Inputs
          label="Time: "
          placeholder="Equipe do atleta"
          format="select"
          name="team"
          value={athlete.team}
          onChange={handleChange}
          options={["Selecione o time", game.teamA, game.teamB]}
        />
        <Inputs
          label="Numero da camisa: "
          placeholder="Numero da camisa"
          type="number"
          name="shirtNumber"
          value={athlete.shirtNumber}
          onChange={handleChange}
        />
        <Inputs
          format="radio"
          label="Perna de maior habilidade: "
          type="radio"
          name="skillLeg"
          value={athlete.skillLeg}
          onChange={handleChange}
          options={["Esquerda", "Direita"]}
        />
        {pageAthlete === 1 && (
          <div className="fundations">
            <h4>Fundamentos</h4>
            <Inputs
              format="radio"
              label="Passe curto: "
              type="radio"
              name="shortPass"
              value={athlete.shortPass}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="radio"
              label="Passe longo: "
              type="radio"
              name="longPass"
              value={athlete.longPass}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="radio"
              label="Cabeceio: "
              type="radio"
              name="header"
              value={athlete.header}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="radio"
              label="Posicionamento: "
              type="radio"
              name="position"
              value={athlete.position}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="radio"
              label="Velocidade: "
              type="radio"
              name="velocity"
              value={athlete.velocity}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="radio"
              label="Poder de reação: "
              type="radio"
              name="reactionPower"
              value={athlete.reactionPower}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="radio"
              label="Mobilidade: "
              type="radio"
              name="mobility"
              value={athlete.mobility}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="radio"
              label="Mobilidade: "
              type="radio"
              name="finalization"
              value={athlete.finalization}
              onChange={handleChange}
              options={["ruim", "normal", "bom", "acima da média"]}
            />
            <Inputs
              format="textarea"
              label="Adicionar comentário: "
              placeholder="Digite seu comentário"
              className=""
              name="comentary"
              value={athlete.comentary}
              onChange={handleChange}
            />
          </div>
        )}
        {pageAthlete === 2 && (
          <div>
            <h4>Contatos</h4>
            {athlete.contacts.map((contact, index) => (
              <div key={index} className="bdtt">
                <Inputs
                  label="Nome: "
                  placeholder="Nome do contato"
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={(event) =>
                    changeContacts(
                      event,
                      "change",
                      index,
                      "name",
                      event.target.value
                    )
                  }
                />
                <Inputs
                  label="Telefone: "
                  placeholder="Telefone do contato"
                  type="text"
                  name="phone"
                  value={contact.phone}
                  onChange={(event) =>
                    changeContacts(
                      event,
                      "change",
                      index,
                      "phone",
                      event.target.value
                    )
                  }
                />
                <Inputs
                  format="select"
                  label="Responsável: "
                  name="responsable"
                  value={contact.responsable}
                  options={[
                    "Selecione o responsárvel",
                    "Pai",
                    "Mãe",
                    "Empresário",
                    "Tio(a)",
                    "Irmão",
                    "Irmã",
                    "Amigo(a)",
                    "Outro",
                  ]}
                  onChange={(event) =>
                    changeContacts(
                      event,
                      "change",
                      index,
                      "responsable",
                      event.target.value
                    )
                  }
                />
                <button onClick={(event) => changeContacts(event, "add")}>
                  Adicionar outro contato
                </button>
                {index > 0 && (
                  <button
                    onClick={(event) => changeContacts(event, "delete", index)}
                  >
                    Escluir contato
                  </button>
                )}
              </div>
            ))}
            <h5>Status da avaliação:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="avaliationStatus"
              value={athlete.avaliationStatus}
              onChange={handleChange}
              options={["Aprovado", "Observar", "Aprovado direto"]}
            />
            <h5>Agendar avaliação no clube:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="avaliationInClub"
              value={athlete.avaliationInClub}
              onChange={handleChange}
              options={["Prioridade", "Normal"]}
            />
            <h5>Concorrência de avaliadores:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="competitionEvaluators"
              value={athlete.competitionEvaluators}
              onChange={handleChange}
              options={["Alta", "Normal", "Baixa"]}
            />
          </div>
        )}
        {pageAthlete === 3 && (
          <div>
            <h4>Adicionar fotos do atleta:</h4>
            <h4>Adicionar documentos do atleta:</h4>
          </div>
        )}
      </form>
      <div className="disp-flex just-sp-evenly align-center flex-wrap">
        {pageAthlete > 1 && (
          <button
            className="btn btn-blue mg-y-2 "
            onClick={handleChangePageRegresse}
          >
            Voltar
          </button>
        )}
        <button
          className="btn btn-black mg-y-2 "
          onClick={handleChangePageAvance}
        >
          {pageAthlete === 1 && "Adicionar mais informações"}
          {pageAthlete === 2 && "Adicionar fotos e documentos"}
          {pageAthlete === 3 && "Ver ficha do atleta"}
        </button>
        <button className="btn btn-green mg-y-2 " onClick={handleSave}>
          Salvar
        </button>
        <button className="btn btn-red mg-y-2 " onClick={handleDelete}>
          Excluir
        </button>
        <Link
          to={`/campeonatos/detalhes/${idChampionship}/jogos`}
          className="text-decore-none"
        >
          <button className="btn btn-blue mg-y-2 ">Voltar para jogos</button>
        </Link>
      </div>
    </div>
  );
}

export default Athletic;
