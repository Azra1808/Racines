import { Component } from 'react';

/**
 * Barrière d'erreur autour d'un écran non essentiel.
 *
 * Raison d'être : l'écran de lancement est décoratif (animation vectorielle).
 * S'il échoue à s'afficher sur un téléphone particulier — version d'Android,
 * pilote graphique, bibliothèque SVG — React démonte tout l'arbre et le
 * parent ne voit qu'un écran blanc. Comme c'est le PREMIER écran, l'
 * application paraîtrait entièrement cassée alors que tout le reste
 * fonctionne.
 *
 * Avec cette barrière, un échec de l'animation fait simplement passer à
 * l'écran suivant. On perd une animation, jamais l'application.
 *
 * À n'utiliser que sur du décoratif : un écran porteur de contenu doit
 * signaler son erreur, pas la masquer.
 */
export default class EcranProtege extends Component {
  state = { enEchec: false };

  static getDerivedStateFromError() {
    return { enEchec: true };
  }

  componentDidCatch(erreur) {
    // Journalisé et non silencieux : l'équipe doit pouvoir le voir en test.
    console.warn('[RACINES] Écran décoratif indisponible, on continue :', erreur?.message);
    this.props.onEchec?.();
  }

  render() {
    return this.state.enEchec ? null : this.props.children;
  }
}
