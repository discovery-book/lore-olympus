document.addEventListener("DOMContentLoaded", () => {
 
  const tomes = {
    1: {
      nodes: [
        { data: { id: "Persephone", label: "Perséphone", role: "Déesse du Printemps", lore: "Nouvelle dans le monde des dieux, naïve mais déterminée. Dans Lore Olympus, sa relation avec Hadès est centrale.", myth: "Dans la mythologie grecque, elle devient reine des Enfers après son enlèvement par Hadès." } },
        { data: { id: "Hades", label: "Hadès", role: "Roi des Enfers", lore: "Homme puissant mais introverti, en quête de respect et d’amour véritable.", myth: "Dieu des Enfers, frère de Zeus et Poséidon." } },
        { data: { id: "Artemis", label: "Artémis", role: "Déesse de la Chasse", lore: "Colocataire et amie protectrice de Perséphone.", myth: "Déesse vierge, protectrice des jeunes filles." } },
        { data: { id: "Zeus", label: "Zeus", role: "Roi des Dieux", lore: "Souvent autoritaire et hypocrite. Frère d’Hadès et Poséidon.", myth: "Souverain de l’Olympe, connu pour ses nombreuses infidélités." } },
        { data: { id: "Hera", label: "Héra", role: "Reine des Dieux", lore: "Épouse de Zeus, figure de pouvoir et de jalousie.", myth: "Déesse du mariage, protectrice mais vindicative." } },
        { data: { id: "Apollo", label: "Apollon", role: "Dieu des Arts et du Soleil", lore: "Charismatique mais manipulateur et dangereux.", myth: "Dieu des arts, de la musique et de la lumière." } },
        { data: { id: "Hermes", label: "Hermès", role: "Messager des Dieux", lore: "Ami loyal, protecteur de Perséphone.", myth: "Dieu des voyageurs, des voleurs et messager divin." } },
        { data: { id: "Aphrodite", label: "Aphrodite", role: "Déesse de l’Amour", lore: "Joueuse et parfois cruelle. Manipule Éros et Apollon.", myth: "Déesse de la beauté et de la séduction." } },
        { data: { id: "Eros", label: "Éros", role: "Dieu de l’Amour", lore: "Fils d’Aphrodite, ami proche de Perséphone.", myth: "Incarnation de l’amour et du désir." } }
      ],
      edges: [
        { data: { source: "Persephone", target: "Hades", color: "#ffb3c7" } },
        { data: { source: "Persephone", target: "Artemis", color: "#4caf50" } }, 
        { data: { source: "Zeus", target: "Hades", color: "#ffd54f" } }, 
        { data: { source: "Persephone", target: "Apollo", color: "#e53935" } }, 
        { data: { source: "Hermes", target: "Persephone", color: "#1e88e5" } }, 
        { data: { source: "Aphrodite", target: "Eros", color: "#4caf50" } }, 
        { data: { source: "Aphrodite", target: "Apollo", color: "#ffd54f" } } 
      ]
    },
    2: {
      nodes: [
        { data: { id: "Persephone", label: "Perséphone", role: "Déesse du Printemps", lore: "Tome 2: Plus mature et consciente de son rôle en tant que reine des Enfers.", myth: "Rien de changé dans la mythologie." } },
        { data: { id: "Hades", label: "Hadès", role: "Roi des Enfers", lore: "Tome 2: Relations approfondies avec Perséphone et les autres dieux.", myth: "Dieu des Enfers." } },
        { data: { id: "Demeter", label: "Déméter", role: "Déesse de l’Agriculture", lore: "Mère protectrice de Perséphone, son rôle devient plus important.", myth: "Déesse des moissons." } },
        { data: { id: "Zeus", label: "Zeus", role: "Roi des Dieux", lore: "Tome 2: Interventions sur les affaires des autres dieux.", myth: "Souverain de l’Olympe." } }
        // Tu pourras compléter avec d'autres personnages du tome 2
      ],
      edges: [
        { data: { source: "Persephone", target: "Hades", color: "#ffb3c7" } },
        { data: { source: "Demeter", target: "Persephone", color: "#4caf50" } },
        { data: { source: "Zeus", target: "Hades", color: "#ffd54f" } }
        // Ajouter d'autres liens du tome 2
      ]
    }
  };

  
  const cy = cytoscape({
    container: document.getElementById("cy"),
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#cfe7ff",
          "label": "data(label)",
          "text-valign": "center",
          "color": "#fff",
          "text-outline-width": 2,
          "text-outline-color": "#1e2042"
        }
      },
      {
        selector: "edge",
        style: {
          "width": 3,
          "line-color": "data(color)",
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "data(color)"
        }
      }
    ],
    elements: tomes[1].nodes.concat(tomes[1].edges),
    layout: { name: "cose" }
  });

  
  function loadTome(num) {
    cy.elements().remove();
    cy.add(tomes[num].nodes);
    cy.add(tomes[num].edges);
    cy.layout({ name: "cose" }).run();
    document.getElementById("sheet-content").innerHTML = "Aucun personnage sélectionné.";
  }

  
  document.getElementById("tome-select").addEventListener("change", (e) => {
    loadTome(e.target.value);
  });

 
  cy.on("tap", "node", evt => {
    const n = evt.target.data();
    document.getElementById("sheet-content").innerHTML = `
      <h3>${n.label}</h3>
      <p><strong>Rôle :</strong> ${n.role}</p>
      <p><strong>Dans Lore Olympus :</strong> ${n.lore}</p>
      <p><strong>Dans la mythologie :</strong> ${n.myth}</p>
    `;
  });

  
  document.getElementById("reset").addEventListener("click", () => cy.fit());
  document.getElementById("layout").addEventListener("click", () => cy.layout({ name: "cose" }).run());
  document.getElementById("export").addEventListener("click", () => {
    const png = cy.png();
    const a = document.createElement("a");
    a.href = png;
    a.download = "lore-olympus-relations.png";
    a.click();
  });
});

