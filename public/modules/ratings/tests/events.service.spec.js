'use strict';

describe('Events Service', function(){

    var $httpBackend,
    service,
    eventsUrl = 'http://localhost:3000/events';

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function(_$httpBackend_, EventsService){
        $httpBackend = _$httpBackend_;
        service = EventsService;
    }));

    describe('When getting all events', function(){
        it('Should make a call to the API', function(){
            $httpBackend.expectGET(eventsUrl).respond(200);

            service.getAllEvents();

            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('Shoul dend an error when API fails', function(){
            $httpBackend.whenGET(eventsUrl).respond(500);

            var err;

            service.getAllEvents().catch(function(e){
                err = e;
            });

            $httpBackend.flush();
            expect(err).toBeDefined();
        });

        it('Should send data when API is successful', function(){
            $httpBackend.whenGET(eventsUrl).respond(200, [{name: 'test event'}]);

            var data;

            service.getAllEvents().then(function(d){
                data = d;
            });

            $httpBackend.flush();
            expect(data[0].name).toEqual('test event');
        });

    });
});