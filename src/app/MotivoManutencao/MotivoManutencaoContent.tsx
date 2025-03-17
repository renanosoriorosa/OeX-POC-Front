'use client'
import React from "react";

function MotivoManutencaoContent() {
  const [search, setSearch] = React.useState('renan');
  return <h1>MotivoManutencao {search}</h1>;
}

export default MotivoManutencaoContent;
