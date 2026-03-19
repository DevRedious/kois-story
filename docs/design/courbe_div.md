Absolument, **c'est tout à fait possible !** C'est une technique très courante en design web moderne pour casser la monotonie des lignes droites et créer des transitions fluides, souvent appelées "Section Dividers" (séparateurs de section).

Dans le contexte de votre image, vous avez une structure parfaite pour cela : un fond général, une zone sombre en haut, et une zone claire en bas, avec une ébauche de courbe ondulée entre les deux.

Voici les principales méthodes pour y parvenir en HTML/CSS, de la plus simple à la plus flexible.

---

### La Structure HTML de base (pour toutes les méthodes)

Pour que l'effet fonctionne, vous avez généralement besoin de cette structure : une section parente avec le fond principal, et deux div enfants (ou un seul enfant et un pseudo-élément).

**HTML**

```
<div class="main-container">
  <div class="section-top">
    </div>

  <div class="wavy-divider"></div>

  <div class="section-bottom">
    </div>
</div>
```

---

### Méthode 1 : L'utilisation d'une image SVG (La plus simple et recommandée)

C'est la méthode la plus flexible pour obtenir une courbe parfaite et complexe comme de l'eau. Vous dessinez la forme ondulée une seule fois en SVG (un format vectoriel léger qui ne pixellise pas).

**Le concept :** La `.section-top` a un fond sombre. La `.section-bottom` a un fond clair. Entre les deux, vous placez une div `.wavy-divider` qui contient l'image SVG de la vague. La couleur du SVG doit correspondre exactement à la couleur de fond de la section du bas.

#### Le Code CSS :

**CSS**

```
/* Le fond général (forêt) */
.main-container {
  background-image: url('fond-foret.jpg');
  background-size: cover;
}

/* Section du haut (sombre, semi-transparente) */
.section-top {
  background-color: rgba(30, 30, 30, 0.9); /* Sombre transparent */
  color: white;
  padding: 100px 20px;
}

/* Le séparateur de vague */
.wavy-divider {
  width: 100%;
  height: 100px; /* Ajustez la hauteur de la vague */
  background-image: url('data:image/svg+xml;utf8,<svg ...>...</svg>'); /* Votre code SVG ici */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* On le décale un peu pour qu'il chevauche */
  margin-top: -50px;
}

/* Section du bas (claire, semi-transparente) */
.section-bottom {
  background-color: rgba(255, 255, 255, 0.8); /* Clair transparent */
  color: black;
  padding: 100px 20px;
}
```

_Où trouver des vagues SVG ?_ Il existe des générateurs gratuits très pratiques comme **GetWaves.io** ou **Haikei.app** .

---

### Méthode 2 : `clip-path` (Le "découpage" CSS moderne)

Cette méthode est très élégante car elle n'utilise pas d'image externe, mais elle nécessite de comprendre comment dessiner des formes avec des coordonnées.

**Le concept :** Au lieu d'ajouter un élément entre les deux, vous demandez au CSS de "découper" le bas de la `.section-top` selon une forme ondulée.

#### Le Code CSS :

**CSS**

```
.section-top {
  background-color: rgba(30, 30, 30, 0.9);
  color: white;
  padding: 100px 20px 150px; /* Plus de padding en bas pour la vague */

  /* C'est ici qu'on découpe */
  clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 75% 90%, 50% 80%, 25% 90%, 0% 80%);
  /* Ce chemin crée des pics et des vallées (polygon).
     Pour une vraie courbe douce, il faut utiliser des coordonnées
     plus complexes (path) ou la méthode 1.
  */
}
```

---

### Résumé pour votre projet

Si vous souhaitez reproduire exactement l'effet "eau" de votre image, je vous recommande vivement la **Méthode 1 (SVG)** . C'est celle qui vous donnera la courbe la plus douce, la plus naturelle et la plus facile à ajuster.

Absolument, **conserver la transparence est tout à fait possible et c'est tout l'intérêt de la technique** !

Si vous utilisez des couleurs de fond semi-transparentes (comme `rgba(0,0,0,0.5)`) sur vos sections, vous devez simplement vous assurer que votre séparateur (la vague) utilise **exactement la même couleur semi-transparente** .

Si vous utilisez la méthode SVG, vous ne devez pas définir la couleur du SVG dans le fichier image, mais l'appliquer dynamiquement via le CSS.

Voici comment modifier le code pour garantir une transparence parfaite et unifiée entre la section et sa vague.

### La solution : Utiliser `mask-image` (recommandé pour la transparence)

C'est la méthode la plus élégante et la plus "propre" pour obtenir un séparateur transparent qui se fond parfaitement. Au lieu d'afficher une image _par-dessus_ , on utilise l'image (la vague) comme un masque pour _découper_ le bas de la section.

#### Structure HTML (simplifiée)

Nous n'avons besoin que de la section du haut pour faire le découpage.

**HTML**

```
<div class="container-general">
  <div class="section-sombre">
    <h1>Dos koïs</h1>
  </div>

  <div class="section-claire">
    </div>
</div>
```

#### Le Code CSS

C'est ici que tout se joue. L'astuce est d'utiliser un masque SVG.

**CSS**

```
/* Le fond général de la page (votre forêt) */
.container-general {
  background-image: url('chemin/vers/votre/fond-foret.jpg');
  background-size: cover;
  background-attachment: fixed; /* Optionnel, pour un effet de parallaxe */
  min-height: 100vh;
}

/* La section du haut (la zone sombre tronquée) */
.section-sombre {
  color: white;
  padding: 100px 20px 200px; /* Important : plus de padding en bas pour la vague */

  /* --- 1. Définir la couleur transparente --- */
  /* C'est ICI que vous gérez la transparence du fond */
  background-color: rgba(0, 0, 0, 0.7); /* Noir à 70% d'opacité */

  /* --- 2. Appliquer le masque de vague (MÉTHODE RECOMMANDÉE) --- */
  /* On utilise un SVG pour 'découper' le bas de la div */
  -webkit-mask-image: url('chemin/vers/votre/masque-vague.svg');
  mask-image: url('chemin/vers/votre/masque-vague.svg');

  -webkit-mask-size: 100% 120px; /* Largeur 100%, hauteur de la vague */
  mask-size: 100% 120px;

  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  -webkit-mask-position: bottom; /* Le masque se place en bas de la div */
  mask-position: bottom;
}

/* La section du bas (la zone claire) */
.section-claire {
  background-color: rgba(255, 255, 255, 0.5); /* Blanc à 50% d'opacité */
  padding: 50px 20px;
  /* On remonte un peu cette section pour qu'elle passe sous la vague */
  margin-top: -120px;
}
```

### Comment fonctionne `mask-image` pour la transparence ?

C'est magique : le navigateur regarde votre fichier SVG. Partout où le SVG est **noir (opaque)** , la section `.section-sombre` (avec son fond `rgba(0,0,0,0.7)`) sera affichée. Partout où le SVG est **transparent** , la section sera masquée, laissant voir le fond de la page (la forêt).

---

### Alternative : La méthode SVG classique (si vous préférez)

Si vous trouvez les masques trop complexes, vous pouvez utiliser la méthode SVG classique, mais il faut être rigoureux sur les couleurs.

**L'astuce :** La couleur du SVG (`fill`) doit être **strictement identique** à la couleur de fond de la section qu'il prolonge.

**CSS**

```
.section-sombre {
  background-color: rgba(0, 0, 0, 0.7); /* Même couleur */
}

.wavy-divider {
  height: 100px;
  width: 100%;

  /* Le SVG en 'background-image' */
  /* Dans le code SVG, assurez-vous que fill="rgba(0,0,0,0.7)" */
  background-image: url('data:image/svg+xml;utf8,<svg ... fill="rgba(0,0,0,0.7)">...</svg>');

  background-size: 100% 100%;
  margin-top: -1px; /* Pour éviter un micro-espace */
}
```

En résumé : **Oui, la transparence est conservée !** La méthode `mask-image` est la plus puissante et la plus simple à gérer pour garantir que la section et sa vague ont exactement la même opacité.

---

### Implémentation Koi's Story (home)

- **Hero → hero-intro** : le bas du `.hero` est masqué par `mask-image` avec `VISITORS/assets/images/masque-vague.svg` (blanc = visible, bas ondulé = masqué). Le fond body (sakura + grain) apparaît dans les creux. `.hero + .hero-intro` a `margin-top: -80px` pour remonter sous la vague. L’ancien `wave-sep` entre hero et hero-intro a été supprimé.
