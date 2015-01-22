
exports.defineAutoTests = function() {
  describe('<%= pluginName %> object existance check', function() {

    it("window.cordova.plugins.<%= pluginName %>", function () {
      expect(window.cordova.plugins.<%= pluginName %>).toBeDefined();
    });

    it("window.cordova.plugins.<%= pluginName %>.coolMethod", function() {
      expect( window.cordova.plugins.<%= pluginName %>.coolMethod ).toBeDefined();
    });
  });

  describe('coolMethod call test', function() {

    var value;
    var callbacks;

    beforeEach(function(done) {
      callbacks = {
        win: function(arg){
          value = arg;
          done();
        },
        fail: function(err){
          console.log("callbacks.fail");
          done();
        }
      };

      spyOn(callbacks, 'win').and.callThrough();
      spyOn(callbacks, 'fail').and.callThrough();
      
      window.cordova.plugins.<%= pluginName %>.coolMethod("test", callbacks.win, callbacks.fail);
    });

    it("to have been called", function() {
      expect(callbacks.win).toHaveBeenCalled();
    });

    it("check return value", function() {
      expect(value).toBe("test");
    });

  });
};
