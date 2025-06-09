import React from "react"

export default function Championship({ id, name, getChampionshipById }) {
  return (
    <button
      className="buttonNavigation"
      onClick={() => getChampionshipById(id)}
    >
      {name}: {id}
    </button>
  );
}
