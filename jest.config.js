// jest.config.js
module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

	moduleNameMapper: {
		'^@assets/(.*)$': '<rootDir>/src/assets/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@root/(.*)$': '<rootDir>/src/components/root/$1',
		'^@services/(.*)$': '<rootDir>/src/components/services/$1',
		'^@view/(.*)$': '<rootDir>/src/components/view/$1',
		'^@compound/(.*)$': '<rootDir>/src/components/compound/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',
		'\\.(css|scss)$': 'identity-obj-proxy',
		'\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
	},

	collectCoverage: true,
	coverageReporters: ['html', 'text'],
	coverageDirectory: 'coverage',
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
};
