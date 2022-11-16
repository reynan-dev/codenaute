module.exports = {
    display: {
        // Utilise les notifs système pour nous signler qu’un
        // problème est détecté.
        notifications: true,
        // Affiche les chemins des fichiers et numéros de lignes
        // ainsi que les contenus défaillants. Pratique pour ouvrir
        // via un "Ctrl + clic" le fichier au bon emplacement
        // directement dans l'éditeur.
        offendingContent: true,
        // Si jamais on souhaite obtenir l’affiche dans le
        // terminal du détail des règles en place.
        rulesSummary: false,
        // Si on veut afficher des statistiques simplifiées
        // (exemple : "1 error, 1 warning").
        shortStats: true,
        // Pour afficher le détail de chaque action executée,
        // les fichiers analysés, le résumé des opérations.
        verbose: false,
    },
    rules: [
        // Règles globales, appliquées sur tous les contenus ajoutés
        {
            // On renseigne le message qui doit nous être affiché en cas de problème.
            message: 'Aurais-tu oublié de terminer certaines tâches ?',
            // Ici on indique qu’on veut juste une alerte, sans stopper le commit.
            // Par défaut c’est renseigné à "false".
            nonBlocking: true,
            // On passe sous forme de texte ou d’expression rationnelle
            // les contenus à rechercher.
            regex: /(?:FIXME|TODO)/,
            filter: ["^package\\.json$", "^git-precommit-checks\\.config\\.js$"],
        },
        {
            message: 'Tu as des marqueurs de conflits qui traînent',
            regex: /^[<>|=]{4,}/m,
        },
        {
            message:
                'Arrêt du commit : tu as renseigné des choses qui ne doivent pas être commitées !',
            regex: /do not commit/i,
            filter: ["^package\\.json$", "^git-precommit-checks\\.config\\.js$"],
        },
        // Ensuite on peut spécifier des fichiers ou motifs particuliers
        // pour appliquer nos règles, ça se fait avec la propriété "filter".
        {
            // Là encore on peut utiliser une expression rationnelle
            filter: /\.js$/,
            message: '🤔 Hum ! N’as-tu pas oublié de retirer du "console.log(…)" ?',
            nonBlocking: true,
            regex: /^\s*console\.log/,
        },
        // Spécifique à Ruby/Rails
        {
            filter: /_spec\.rb$/,
            message: 'Tu as laissé traîner un "focus" dans tes tests RSpec',
            regex: /(?:focus: true|:focus => true)/,
        },
        {
            filter: /\.rb$/,
            message:
                'Ça sent l’oubli après un debug manuel : regarde ce `binding.pry` qui traîne',
            regex: /^[^#]*\bbinding\.pry/,
        },
    ],
}
