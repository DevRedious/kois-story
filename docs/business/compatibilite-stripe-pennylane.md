# Compatibilité Stripe et Pennylane — Koi's Story

*Document de référence pour articuler paiement en ligne (Stripe) et comptabilité / facturation (Pennylane).*

---

## 1. Rôles respectifs

| Produit | Rôle | Utilisation Koi's Story |
|--------|------|-------------------------|
| **Stripe** | Encaissement en ligne (cartes, liens de paiement, abonnements). API développeur, webhooks, tunnel de paiement sur le site. | V2 (dormant) — pas de paiement en ligne en V1 ; virement bancaire uniquement. |
| **Pennylane** | Facturation, comptabilité, compte pro, TPE, e-virement (Fintecture). Déjà utilisé par la cliente pour facturation et gestion client. | En place — logiciel de facturation / gestion et CRM (cf. `collecte_infos_client.md`). |

Stripe et Pennylane sont **complémentaires** : Stripe encaisse, Pennylane enregistre et rapproche pour la compta.

---

## 2. Intégration officielle Stripe ↔ Pennylane

Pennylane propose une **connexion native à Stripe** (et Stripe Billing) par API.

### 2.1 Données synchronisées vers Pennylane

- **Encaissements** : chaque paiement Stripe remonte dans Pennylane.
- **Informations de facturation** : TVA, pays du client, date d’échéance.
- **Payouts** : virements Stripe vers le compte bancaire.
- **Frais Stripe** : commissions enregistrées pour la compta.

Source : [Connecter Stripe à Pennylane](https://help.pennylane.com/fr/articles/18784-connecter-stripe-a-pennylane), [Intégration Stripe et Pennylane](https://www.pennylane.com/fr/blog/contenu-expert-comptable/integration-stripe-pennylane).

### 2.2 Modes de fonctionnement

- **Facturation via Stripe (Stripe Billing)** : si les factures sont émises via Stripe, Pennylane peut automatiser la compta des encaissements (revenus, TVA, échéances, soldes clients).
- **Facturation hors Stripe** (ex. factures créées dans Pennylane) : Pennylane fait un **rapprochement semi-automatique** entre paiements Stripe et factures (date, montant, libellé).

### 2.3 Frais Stripe dans Pennylane

Les frais de transaction Stripe sont récupérés par API. Si les frais n’apparaissent pas, il peut s’agir d’une récupération des mouvements depuis la banque classique plutôt que depuis Stripe ; dans ce cas, configurer la récupération des transactions **directement depuis Stripe** (mensuelle) dans les paramètres Pennylane.

---

## 3. Points d’attention

### 3.1 Facturation électronique (Factur-X)

Stripe **ne génère pas** de factures au format Factur-X (obligation française de facturation électronique). Pennylane peut importer les factures Stripe pour l’automatisation comptable mais **ne convertit pas** les documents non conformes en Factur-X. Pour rester conforme, les factures « officielles » doivent être émises depuis Pennylane (ou un outil conforme), Stripe restant le canal d’encaissement.

### 3.2 Flux recommandé pour Koi's Story

- **V1 (actuel)** : virement bancaire uniquement ; facturation et suivi dans Pennylane.
- **V2 (si paiement en ligne)** :  
  - Tunnel Stripe sur le site (acompte ou solde).  
  - Factures émises dans **Pennylane** (conformité Factur-X, TVA, CGV).  
  - Connexion **Stripe → Pennylane** pour encaissements, payouts et frais ; rapprochement avec les factures Pennylane (date, montant, libellé).

---

## 4. Synthèse compatibilité

| Critère | Compatible | Note |
|---------|------------|------|
| Encaissements Stripe → Pennylane | Oui | Via connexion Stripe dans Pennylane |
| Frais Stripe en compta | Oui | Récupérés par API ; vérifier la source (Stripe vs banque) |
| Rapprochement factures / paiements | Oui | Automatique si facturation Stripe ; semi-auto sinon |
| Factur-X / conformité FR | À gérer | Factures à émettre côté Pennylane (ou outil conforme) |
| Utilisation simultanée (virement + Stripe) | Oui | Pennylane gère virements et encaissements Stripe |

---

## 5. Références

- [Connecter Stripe à Pennylane](https://help.pennylane.com/fr/articles/18784-connecter-stripe-a-pennylane) — Centre d’aide Pennylane  
- [Intégration Stripe, Stripe Billing et Pennylane](https://www.pennylane.com/fr/blog/contenu-expert-comptable/integration-stripe-pennylane) — Blog Pennylane  
- [Connexion Stripe](https://www.pennylane.com/fr/integrations/stripe) — Page intégrations Pennylane  
- [Stripe Documentation](https://stripe.com/docs) — API, Checkout, Payment Intents  

---

*Dernière mise à jour : mars 2026 — contexte projet Koi's Story (THP-Final).*
