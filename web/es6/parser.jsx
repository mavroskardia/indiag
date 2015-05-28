class Parser {

    parse() {

        return {
            title: 'Test Diagram',
            views: [{
                id: 1,
                name: 'Dashboard',
                areas: [{
                    name: 'Projects',
                    actions: [{
                        name: 'Open',
                        linksto: 2
                    }]
                }, {
                    name: 'Proposals',
                    actions: [{
                        name: 'Open',
                        linksto: 3
                    }, {
                        name: 'Delete'
                    }]
                }],
            }, {
                id: 2,
                name: 'Project Overview',
                areas: [{
                    name: 'Project',
                    actions: [{
                        name: 'Open',
                        linksto: 4
                    }]
                }]
            }, {
                id: 3,
                name: 'Proposal Overview',
                areas: [{
                    name: 'Proposal',
                    actions: [{
                        name: 'Open',
                        linksto: 5
                    }]
                }]
            }, {
                id: 4,
                name: 'Project Summary',
                areas: [{
                    name: 'General'
                }, {
                    name: 'Categories'
                }, {
                    name: 'Items'
                }]
            }, {
                id: 5,
                name: 'Proposal Summary',
                areas: [{
                    name: 'Projects'
                }, {
                    name: 'Bidders'
                }]
            }]
        };
    }
}