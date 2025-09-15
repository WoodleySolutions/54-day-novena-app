import { 
  createRosaryStepMapping, 
  getBeadIndexForStep, 
  getStepIndexForBead 
} from '../rosaryMapping';
import { getRosaryConfig } from '../../constants/rosarySequences';

describe('Rosary Mapping Tests', () => {
  describe('Daily Rosary Step Mapping', () => {
    const mappings = createRosaryStepMapping('daily-rosary');
    const config = getRosaryConfig('daily-rosary');
    
    test('should have correct number of mappings', () => {
      console.log('Total mappings:', mappings.length);
      console.log('Total beads:', config.beadSequence.length);
      console.log('Mappings:', mappings.map(m => ({ step: m.stepIndex, bead: m.beadIndex, desc: m.description })));
    });

    test('step 0 (intro) should map to cross (bead 0)', () => {
      const beadIndex = getBeadIndexForStep(0, 'daily-rosary');
      expect(beadIndex).toBe(0);
      expect(config.beadSequence[beadIndex].type).toBe('cross');
    });

    test('step 1 (rosary opening) should map to first large bead (bead 1)', () => {
      const beadIndex = getBeadIndexForStep(1, 'daily-rosary');
      expect(beadIndex).toBe(1);
      expect(config.beadSequence[beadIndex].type).toBe('large-bead');
    });

    test('step 2 (mysteries intro) should map to medal', () => {
      const beadIndex = getBeadIndexForStep(2, 'daily-rosary');
      const bead = config.beadSequence[beadIndex];
      expect(bead.type).toBe('medal');
    });

    test('decade steps should map to large beads', () => {
      // Steps 3-7 should be the five decades
      for (let decade = 0; decade < 5; decade++) {
        const stepIndex = 3 + decade;
        const beadIndex = getBeadIndexForStep(stepIndex, 'daily-rosary');
        const bead = config.beadSequence[beadIndex];
        console.log(`Decade ${decade + 1}: Step ${stepIndex} -> Bead ${beadIndex} (${bead.type})`);
        expect(bead.type).toBe('large-bead');
      }
    });

    test('final prayers should map to medal', () => {
      const finalSteps = [8, 9]; // Hail Holy Queen, Rosary Prayer
      finalSteps.forEach(stepIndex => {
        const beadIndex = getBeadIndexForStep(stepIndex, 'daily-rosary');
        const bead = config.beadSequence[beadIndex];
        console.log(`Final step ${stepIndex} -> Bead ${beadIndex} (${bead.type})`);
        expect(bead.type).toBe('medal');
      });
    });
  });

  describe('Bead Sequence Analysis', () => {
    const config = getRosaryConfig('daily-rosary');
    
    test('should analyze bead sequence structure', () => {
      console.log('\n=== BEAD SEQUENCE ANALYSIS ===');
      
      const beadTypes = config.beadSequence.map((bead, index) => ({
        index,
        type: bead.type,
        id: bead.id,
        prayers: bead.prayers
      }));
      
      console.log('Bead sequence:');
      beadTypes.forEach(bead => {
        console.log(`  ${bead.index}: ${bead.type} (${bead.id}) - ${bead.prayers.join(', ')}`);
      });
      
      const largeBreadIndices = beadTypes
        .filter(bead => bead.type === 'large-bead')
        .map(bead => bead.index);
      
      console.log('\nLarge bead indices:', largeBreadIndices);
      
      const medalIndices = beadTypes
        .filter(bead => bead.type === 'medal')
        .map(bead => bead.index);
      
      console.log('Medal indices:', medalIndices);
    });
  });

  describe('54-Day Novena Step Mapping', () => {
    const mappings = createRosaryStepMapping('54-day-novena');
    
    test('should have correct mappings for 54-day novena', () => {
      console.log('\n=== 54-DAY NOVENA MAPPINGS ===');
      console.log('Total mappings:', mappings.length);
      mappings.forEach(mapping => {
        console.log(`  Step ${mapping.stepIndex}: ${mapping.description} -> Bead ${mapping.beadIndex}`);
      });
    });
  });
});