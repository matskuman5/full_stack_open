const dummy = require('../utils/list_helper').dummy

test('dummy', () => {
  const result = dummy()

  expect(result).toBe(1)
})