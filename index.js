const App = require('./src/infra/interface/app');

console.log('🔄 Iniciando servidor...');

const app = new App();
app.start(process.env.PORT || 3000)
  .then(() => {
    console.log('✅ Servidor iniciado correctamente');
  })
  .catch((error) => {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  });

// Manejo graceful de shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Apagando servidor...');
  process.exit(0);
});