/**
 * Created by setup on 13/11/2017.
 */

var assert = require('assert');
var hbase = require('hbase');

hbase({ host: 'localhost', port: 8081 })
    .table('test3' )
    .create('cf', function(err, success){
        this
            .row('my_row')
            .put('cf:my_column', 'my value', function(err, success){
                this.get('cf', function(err, cells){
                    this.exists(function(err, exists){
                        assert.ok(exists);
                    });
                });
            });
    });
