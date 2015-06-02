class D3Generator {
    constructor(output) {
        this.w = 1000;
        this.h = 500; // still haven't figured out a good way to decouple this

        this.margins = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };

        this.svg = d3.select(output)
            .attr('width', this.w)
            .attr('height', this.h)
            .append('g')
            .attr('transform', 'translate(' + this.margins.left + ',' + this.margins.top + ')');

        // build the arrow.
        d3.select(output).append("defs").selectAll("marker")
            .data(["end"]) // Different link/path types can be defined here
            .enter().append("marker") // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 10)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");

        this.parser = new D3Parser();
    }

    reset() {
        this.svg.selectAll('*').remove();
    }

    generate(code) {
        this.reset();
        this.diagram = this.parser.parse(code);
        this.render_title();
        this.create_layout();
        this.setup_data();
        this.render();
    }

    render_title() {
        this.svg.append('text')
            .attr('transform', 'translate(0,20)')
            .text(this.diagram.title);
    }

    create_layout() {
        this.force = d3.layout.force()
            .size([this.w, this.h])
            .linkDistance(d => d.source.w + d.target.w)
            .charge(d => -d.w - 200)
            .gravity(0.5)
            .on('tick', () => {
                this.nodes
                    .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

                this.links
                    .attr('x1', d => d.source.x + d.source.w)
                    .attr('y1', d => d.source.y + (d.offset || 0) * 30)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y + 10);
            });
    }

    setup_data() {

        this.setup_links();
        this.setup_nodes();

        this.force
            .nodes(this.diagram.views)
            .links(this.diagram.links);
    }

    setup_links() {
        this.links = this.svg.selectAll('.link')
            .data(this.diagram.links)
            .enter().append('line')
            .attr('class', 'link indiag-editor')
            .attr('marker-end', 'url(#end)');
    }

    setup_nodes() {
        let drag = this.force.drag()
            .on('dragstart', this.dragstart);

        this.nodes = this.svg.selectAll('.node')
            .data(this.diagram.views)
            .enter().append('g')
            .attr('class', 'node indiag-editor')
            .call(drag);

        this.build_node_borders();
        this.build_node_title();
        this.build_node_areas();
        this.correct_dimensions();
    }

    dragstart(d) {
        d3.select(this).classed('fixed', d.fixed = true);
    }

    correct_dimensions() {
        this.nodes.each(function (d, i) {
            let me = d3.select(this),
                dims = this.getBBox(),
                w = dims.width + 10 + 10;

            d.w = w;

            // fix title
            me.selectAll('.title')
                .attr('x', w / 2);

            me.selectAll('.separator')
                .attr('x2', w);

            // fix areas

            // fix border
            me.selectAll('rect')
                .attr('width', w)
                .attr('height', dims.height + 10);
        });
    }

    build_node_title() {
        this.nodes
            .append('text')
            .attr('class', 'title indiag-editor')
            .attr('y', 15)
            .text(d => d.name)
            .attr('text-anchor', 'middle');

        this.nodes
            .append('line')
            .attr('class', 'separator indiag-editor')
            .attr('x1', 0)
            .attr('y1', 20)
            .attr('y2', 20);
    }

    build_node_borders() {
        this.nodes.append('rect')
            .attr('height', 100);
    }

    build_node_areas() {
        this.nodes.each(function (d, i) {
            let me = d3.select(this),
                areas = me.selectAll('.area'),
                data = me.data()[0];

            if (!data.areas) return;

            data.areas.forEach((a, i) => {
                me.append('text')
                    .attr('class', 'area indiag-editor')
                    .attr('x', 10)
                    .attr('y', 40 + i * 30)
                    .text(a);
            });
        });
    }

    render() {
        this.force.start();
    }
}

class CanvasGenerator {
    constructor(output) {
        this.output = output;
        this.w = this.output.width;
        this.h = this.output.height;
        this.margins = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.c = this.output.getContext('2d');
        this.parser = new Parser();
    }

    generate(code) {
        this.diagram = this.parser.parse(code);
        this.render_title();
        this.compute_layout(this.diagram.views);
    }

    render_title() {
        this.c.fillText(this.diagram.title, 0, 10);
    }

    compute_layout(views) {
        let layout = [];

        for (let view of views) {
            console.log('laying out views');
        }
    }
}