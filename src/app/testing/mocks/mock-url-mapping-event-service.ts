export class MockUrlMappingEventsService {
    emitSuccess = jasmine.createSpy('emitSuccess');
    emitError = jasmine.createSpy('emitError');
}