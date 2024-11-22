module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn dev',
      numberOfRuns: 3,
      url: ['http://localhost:4173'],
      // 서버 시작 대기 설정 추가 (선택사항) 60초 기다림
      startServerReadyPattern: 'ready started server on',
      startServerReadyTimeout: 60000,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
  },
};