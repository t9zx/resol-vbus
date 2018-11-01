/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const expect = require('./expect');
const vbus = require('./resol-vbus');



const ConfigurationOptimizer = vbus.ConfigurationOptimizer;



describe('ConfigurationOptimizer', function() {

    describe('.getOptimizerOptions', function() {

        it('should be a function', function() {
            expect(ConfigurationOptimizer).property('getOptimizerOptions').a('function');
        });

        it('should reject if no deviceAddress is given', function() {
            return ConfigurationOptimizer.getOptimizerOptions().then(function() {
                throw new Error('Should have thrown an error, but resolved');
            }, function(err) {
                expect(err).instanceOf(Error);
                expect(err).property('message').equal('Must be implemented by sub-class');
            });
        });

        it('should return single match if a deviceAddress is given', function() {
            const TestableConfigurationOptimizer = ConfigurationOptimizer.extend({}, {

                deviceAddress: 0x1111,

            });

            return TestableConfigurationOptimizer.getOptimizerOptions().then(function(matches) {
                expect(matches).an('array').lengthOf(1);

                const match = matches [0];
                expect(match).equal(null);
            });
        });

    });

    describe('.matchOptimizer', function() {

        it('should be a function', function() {
            expect(ConfigurationOptimizer).property('matchOptimizer').a('function');
        });

        it('should reject if no deviceAddress is given', function() {
            const options = {
                deviceAddress: 0x1111,
            };

            return ConfigurationOptimizer.matchOptimizer(options).then(function() {
                throw new Error('Should have thrown an error, but resolved');
            }, function(err) {
                expect(err).instanceOf(Error);
                expect(err).property('message').equal('Must be implemented by sub-class');
            });
        });

        it('should match if the right deviceAddress is given', function() {
            const TestableConfigurationOptimizer = ConfigurationOptimizer.extend({}, {

                deviceAddress: 0x1111,

            });

            const options = {
                deviceAddress: 0x1111,
            };

            return TestableConfigurationOptimizer.matchOptimizer(options).then(function(result) {
                expect(result).property('match').equal(1);
                expect(result).property('Optimizer').equal(TestableConfigurationOptimizer);
                expect(result).property('options').equal(null);
            });
        });

        it('should not match if the wrong deviceAddress is given', function() {
            const TestableConfigurationOptimizer = ConfigurationOptimizer.extend({}, {

                deviceAddress: 0x1111,

            });

            const options = {
                deviceAddress: 0x2222,
            };

            return TestableConfigurationOptimizer.matchOptimizer(options).then(function(result) {
                expect(result).property('match').equal(0);
                expect(result).property('Optimizer').equal(TestableConfigurationOptimizer);
                expect(result).property('options').equal(null);
            });
        });

    });

    describe('#completeConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('completeConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            const optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.completeConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#optimizeLoadConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('optimizeLoadConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            const optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.optimizeLoadConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#optimizeSaveConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('optimizeSaveConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            const optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.optimizeSaveConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

    describe('#generateClockConfiguration', function() {

        it('should be a method', function() {
            expect(ConfigurationOptimizer.prototype).property('generateClockConfiguration').a('function');
        });

        it('should be an abstract method', function() {
            const optimizer = new ConfigurationOptimizer();

            expect(function() {
                return optimizer.generateClockConfiguration();
            }).throw(Error, 'Must be implemented by sub-class');
        });

    });

});
