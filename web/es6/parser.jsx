class D3Parser {

    constructor(parser) {
        this.parser = parser;
    }

    parse(code) {

        let ast = this.parser
            .parse(code.trim() + '\n')
            .filter(f => typeof (f) == 'object');

        return this.transform(ast);
    }

    transform(ast) {
        let diagram = {
            title: '[NO TITLE]',
            views: [],
            links: []
        };

        for (let node of ast) {
            switch (node.type) {
            case 'title':
                diagram.title = node.title;
                break;
            case 'view':
                diagram.views.push(this.transform_view(node));
            default:
                break;
            }
        }

        diagram.links = this.build_links(diagram);

        return diagram;
    }

    transform_view(node) {
        return {
            nodeid: node.id,
            name: node.name,
            areas: node.areas.map(a => {
                return {
                    name: a.name,
                    viewid: a.id
                }
            })
        };
    }

    build_links(diagram) {

        return Array.prototype.concat.apply([],
            diagram.views.map(
                (v, i) => v.areas.map(
                    (a, j) => ({
                        source: i,
                        target: this.get_view_by_id(diagram.views, a.viewid),
                        offset: j + 1
                    }))));

    }

    get_view_by_id(views, id) {
        let index = -1;

        views.forEach((v, i) => {
            if (v.nodeid == id) index = i;
        });

        return index;
    }

}