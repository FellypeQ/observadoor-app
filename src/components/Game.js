import { React } from "react";

function Game(props) {
  return (
    <form>
      <section className="mg-b-2">
        <label>Jogo: </label>
        <input
          type="text"
          placeholder="Nome do jogo"
          className="wid-80"
          name="gameName"
          value={props.gameName}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
        <br />
        <label className="">Data e hora do jogo: </label>
        <input
          type="datetime-local"
          className=" wid-50"
          name="dateGame"
          value={props.dateGame}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
      </section>
      <section className="disp-flex flex-direct-col">
        <select
          className="mg-b-2"
          name="category"
          value={props.category}
          onChange={props.handleChange}
          disabled={props.disabled}
        >
          <option>Categoria Profissional</option>
          <option>Categoria sub-23</option>
          <option>Categoria sub-22</option>
          <option>Categoria sub-21</option>
          <option>Categoria sub-20</option>
          <option>Categoria sub-19</option>
          <option>Categoria sub-18</option>
          <option>Categoria sub-17</option>
          <option>Categoria sub-16</option>
          <option>Categoria sub-15</option>
          <option>Categoria sub-14</option>
          <option>Categoria sub-13</option>
          <option>Categoria sub-12</option>
          <option>Categoria sub-11</option>
          <option>Categoria sub-10</option>
        </select>
        <sectionteans className="disp-flex just-sp-between">
          <input
            type="text"
            placeholder="Equipe A"
            className="wid-45"
            style={{ margin: "0", textAlign: "center" }}
            name="teamA"
            value={props.teamA}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
          X
          <input
            type="text"
            placeholder="Equipe B"
            className="wid-45"
            style={{ margin: "0", textAlign: "center" }}
            name="teamB"
            value={props.teamB}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
        </sectionteans>
        {props.noButton ? (
          <></>
        ) : (
          <button
            className="btn btn-black mg-t-2"
            onClick={props.handleLikeAthletic}
          >
            Gostei do atleta
          </button>
        )}
      </section>
    </form>
  );
}

export default Game;
