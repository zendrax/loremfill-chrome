var TextStrategy = Backbone.Model.extend({
    strategies: {
        id: function(element) {
            return element.attr('id');
        },
        name: function(element) {
            return element.attr('name');
        },
        class: function(element) {
            return element.attr('class');
        },
        label: function(element) {
            var id = element.attr('id');
            if(id) {
                var label = $("label[for='" + id + "']").text();
                return label;
            }
        },
        placeholder: function(element) {
            return element.attr('placeholder');
        },
        angular: function(element) {
            return element.attr('ng-model');
        },
        type: function(element) {
            return element.attr('type');
        }
    },

    decide: function(element) {
        var factory = new MatcherFactory();
        for(var attribute_type in this.strategies) {
            if(this.strategies.hasOwnProperty(attribute_type)) {
                var value = this.strategies[attribute_type].call(this, element);
                var random_value = factory.get(value).value();
                if(random_value) {
                    return random_value;
                }
            }
        }
        if (element.context.type === 'textarea') {
            return chance.paragraph({ sentences: Math.floor((Math.random() * 10) + 5) });
        }
        if (element.context.getAttribute('minlength')) {
            return chance.sentence({ words: parseInt(element.context.getAttribute('minlength')) });
        }
        return chance.word();
    }
});

var SelectStrategy = Backbone.Model.extend({
    decide: function(element) {
        var options = element.find("option");
        var values = $.map(options ,function(option) {
            return option.value;
        });
        return chance.pick(values);
    }
});
