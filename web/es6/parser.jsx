class D3Parser {

    constructor() {

        this.States = {
            Unknown: 0xff,
            Title: 0x01
        };

        this.state = this.States.Unknown;

    }

    scan(code) {
        // first pass: make sure it's syntatically correct and make tokens

        let count = 0,
            index = 0,
            buffer = [];

        while (true) {

            count++;

            switch (this.state) {

            case this.States.Unknown:
            default:
                buffer.push(code[index]);
                index++;
                break;

            }

        }

    }

    lex(code) {
        // second pass: turn tokens into AST
    }

    parse(code) {
        // third pass: turn AST into meaning
    }

    old(code) {


        let diagram = {},
            index = 0,
            count = 0,
            buffer = [];

        console.log(`parsed through ${count} characters`);

        return {
            title: 'Test Title',
            views: [{
                name: 'Pretty Long View Title',
                areas: ['Area 1', 'Area 2', 'Area 3']
            }, {
                name: 'View 2',
                areas: ['Area 1', 'Area 2', 'Area 3']
            }, {
                name: 'View 3',
                areas: ['Area 1', 'My Extra Long View Name', 'Area 3', 'Area 4']
            }, {
                name: 'View 4',
                areas: ['Area 1', 'Area 2']
            }],
            links: [{
                source: 0,
                target: 1,
                offset: 1 // offset is where the arrow should start
            }, {
                source: 0,
                target: 2,
                offset: 2
            }, {
                source: 2,
                target: 3,
                offset: 3
            }]
        };
    }
}

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