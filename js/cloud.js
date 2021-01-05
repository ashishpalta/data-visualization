function wordCloud(selector) {

    var fill = d3.scale.category20();

   
    var svg = d3.select("svg")
        .append("g")
        .attr("transform", "translate(600,280)");


    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 2)
            .text(function(d) { return d.text; });

        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    return {

     
        update: function(words) {
            d3.layout.cloud()
                .size([1600, 800])
                .words(words)
                .padding(1)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

var words = [
    "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.",
    "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.",
    "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.",
    "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love.The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
]



function getWords(i) {
    return words[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};
            })
}


function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i ++ % words.length))
    setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}


var myWordCloud = wordCloud('body');

//Start cycling through the demo data
showNewWords(myWordCloud);
