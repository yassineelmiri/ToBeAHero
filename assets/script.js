const monDiagramme = {
  classe: {
    id: 1,
    Titre: "table",
    operations: [{ name: "+Age", returnType: "integer" }],
    attributs: ["Prenom:String(15)", "DateNa"],
  },
  classe1: {
    id: 2,
    Titre: "table2",
    operations: [{ name: "+Age", returnType: "integer" }],
    attributs: ["Prenom:String(15)", "DateNa"],
  },
  classe2: {
    id: 3,
    Titre: "table3",
    operations: [
      { name: "+Age", returnType: "integer" },
      { name: "+Ajouter", returnType: "void" },
    ],
    attributs: ["Nom:String(20)"],
  },
};

function createDiagram(monDiagramme) {
  let diagramsHTML = "";
  for (const key in monDiagramme) {
    const { Titre, operations, attributs } = monDiagramme[key];

    const attributsList = attributs.map((attr) => `<li>${attr}</li>`).join("");
    const operationsList = operations
      .map((op) => `<li>${op.name}(): ${op.returnType}</li>`)
      .join("");
    diagramsHTML += `
    <div class="card" id="${key}" draggable="true" ondragstart="drag(event)">
      <div class="titre"><h4>${Titre}</h4></div>
      <div class="body">
        <ul>${attributsList}</ul>
      </div>
      <div class="method">
        <ul>${operationsList}</ul>
      </div>
    </div>
    `;
  }
  return diagramsHTML;
}

document.querySelector("#diagram-container").innerHTML =
  createDiagram(monDiagramme);

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const card = document.getElementById(data);
  event.target.appendChild(card);
}

const diagramContainer = document.getElementById("diagram-container");
diagramContainer.ondragover = allowDrop;
diagramContainer.ondrop = drop;
