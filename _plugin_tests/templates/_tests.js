
exports.defineAutoTests = function() {
  describe('<%= pluginName %> object existance check', function() {

    it("<%= pluginID %>", function () {
      expect( <%= pluginID %>).toBeDefined();
    });

    it("<%= pluginID %>.coolMethod", function() {
      expect( <%= pluginID %>.coolMethod ).toBeDefined();
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
      
      <%= pluginID %>.coolMethod("test", callbacks.win, callbacks.fail);
    });

    it("to have been called", function() {
      expect(callbacks.win).toHaveBeenCalled();
    });

    it("check return value", function() {
      expect(value).toBe("test");
    });

  });
};
