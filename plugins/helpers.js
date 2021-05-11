const path = require('path');

module.exports = (env, callback) => {
    
    // Add some helpers to the environment so we can use them in the templates.

    const relPath = (page, filename) => path.relative(path.dirname(page.filename), filename);

    const ancestors = (page) => {
        let ancestor = page.parent;
        const ancestors = [];
        while (ancestor) {
            ancestors.push(ancestor);
            ancestor = ancestor.parent;
        }
        return ancestors.reverse();
    }

    const isAncestor = (p1, p2) =>
        ancestors(p2).includes(p1.parent);



    const hasIndex = (page) => {
        return !!Object.keys(page).find(key => key.substring(0, 5) === 'index');
    }

    const hasSubsections = (page) => {
        return !!Object.values(page).find(hasIndex);
    }


    const getLanguage = (page) => {
        return page.metadata.language || env.locals.defaultLanguage;
    }

    const getFileName = (language) => {
        const languageSuffix = (language === env.locals.defaultLanguage) ? '' : '-' + language;
        return 'index' + languageSuffix + '.md';
    }

    const getAltLanguage = (page) => {
        return getLanguage(page) === 'de' ? 'en' : 'de';
    }

    // gets de for en page and en for de page, possibly undefined if not present.
    const getAltLanguagePage = (page) => {
        const otherLanguage = getAltLanguage(page);

        // Possibly returns undefined.
        return page.parent[getFileName(otherLanguage)];
    }




    // gets the page object at the (folder) page with the given language (which can be a string or a page object, in which case the page's language is chosen). If not present, return the first 'index…' filed you can find; if there is none, it returns undefined.
    const getIndex = (language, page) => {
        if (typeof language !== "string") {
            // This allows for a page object to be passed as well.
            language = getLanguage(language);
        }
        const desirable = getFileName(language);
        if (page[desirable]) {
            return page[desirable];
        } else {
            const substitute = Object.keys(page).find(key => key.substring(0, 5) === 'index');
            if (!substitute) return undefined;
            return page[substitute];
        }
    }

    // returns a sorted array of navigation entries (objects with relative url, title, weight, and whether they are the currentPage) for the section
    const getSubsections = (currentPage, section) => {
        return Object.values(section)
            .filter(hasIndex)
            .sort((p1, p2) => {
                const index1 = getIndex(currentPage, p1);
                const index2 = getIndex(currentPage, p2)
                return index1.metadata.weight - index2.metadata.weight;
            });
    }




    const lastMondayAtMidnight = (date) => {
        //- getDay() gibt für Sonntag 0, Montag 1, etc., deshalb addieren wir 6.
        const daysSinceMonday = (date.getDay() + 6) % 7
        const lastMonday = new Date(date.getTime());
        lastMonday.setDate(date.getDate() - daysSinceMonday);
        lastMonday.setHours(0, 0, 0, 0);
        return lastMonday;
    };

    const sameDay = (d1, d2) =>
        d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()

    const sameWeek = (d1, d2) =>
        sameDay(lastMondayAtMidnight(d1), lastMondayAtMidnight(d2));

    env.helpers.relPath = relPath;
    env.helpers.ancestors = ancestors;
    env.helpers.isAncestor = isAncestor;
    
    env.helpers.hasIndex = hasIndex;
    env.helpers.hasSubsections = hasSubsections;
    env.helpers.getLanguage = getLanguage;
    env.helpers.getFileName = getFileName;
    env.helpers.getAltLanguage = getAltLanguage;
    env.helpers.getAltLanguagePage = getAltLanguagePage;

    env.helpers.getIndex = getIndex;
    env.helpers.getSubsections = getSubsections;

    env.helpers.lastMondayAtMidnight = lastMondayAtMidnight;
    env.helpers.sameDay = sameDay;
    env.helpers.sameWeek = sameWeek;

    // Tell the plugin manager we are done.
    callback();
}