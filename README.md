# AI Governance Strategy Tool v4

An interactive web application for exploring AI governance options, policies, and their potential outcomes. This tool integrates comprehensive research data from academic literature, policy proposals, and real-world implementations.

## Features

### Core Functionality
- **Strategic Posture Selection**: Choose from 9 different macro-strategic approaches
- **Resource Management**: Work within budget ($80B-$200B) and political capital constraints  
- **Multi-Category Options**: Select from institutions, regulatory mechanisms, and technical controls
- **Requirements & Synergies**: Navigate dependencies, complementary effects, and contradictions
- **Outcome Simulation**: Roll individual outcomes or run Monte Carlo analysis (1000 trials)

### Enhanced Features
- **CSV Data Integration**: Comprehensive governance mapping with literature references
- **Rich Tooltips**: Detailed descriptions, examples, failure modes, and current progress
- **Search Functionality**: Find governance options by name, description, or content
- **Export Capability**: Save build configurations as JSON files
- **Accessibility Support**: Keyboard navigation, focus indicators, high contrast mode
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Help System**: Built-in guide and documentation

## Data Sources

The tool integrates data from the `AI_Governance_Mapping.csv` file, which includes:

- **Academic Literature**: Research papers, policy analyses, and theoretical frameworks
- **Real-World Examples**: Current implementations and historical precedents  
- **Impact Assessments**: Quantitative ratings and qualitative analysis
- **Implementation Details**: Costs, political requirements, and feasibility assessments

## File Structure

```
AI-Governance-Tool/
├── index.html              # Main application interface
├── app.js                  # Core application logic and simulation engine
├── styles.css              # Styling and responsive design
├── csv-parser.js           # CSV data integration module
├── AI_Governance_Mapping.csv # Comprehensive governance data
├── test-browser.html       # Browser compatibility testing
└── README.md              # This documentation
```

## Quick Start

1. **Local Development Server**:
   ```bash
   cd AI-Governance-Tool
   python -m http.server 8080
   # Open http://localhost:8080 in your browser
   ```

2. **Direct File Access**:
   - Open `index.html` in any modern web browser
   - Note: CSV loading may require a local server for some browsers

3. **Browser Compatibility Test**:
   - Open `test-browser.html` to verify your browser supports all features

## How to Use

### Basic Workflow
1. **Select Difficulty**: Choose Easy ($200B, 20 PC), Medium ($120B, 12 PC), or Hard ($80B, 8 PC)
2. **Choose Strategic Posture**: Pick one macro-approach (free of charge)
3. **Build Your Portfolio**: Select institutional, regulatory, and technical options within budget
4. **Review Requirements**: Ensure posture-specific requirements are met
5. **Lock In**: Finalize your selections
6. **Analyze Outcomes**: Roll individual results or run Monte Carlo simulations

### Key Concepts
- **Budget**: Financial resources in billions of dollars
- **Political Capital (PC)**: Political feasibility and support required
- **Temperature**: Environmental favorability slider (0-100%)
- **Requirements**: Mandatory combinations for certain postures
- **Synergies**: Complementary options that enhance effectiveness
- **Contradictions**: Conflicting options that reduce overall success

### Advanced Features
- **Search**: Use the search box to find specific governance mechanisms
- **Export**: Download your build configuration for sharing or analysis  
- **Help Modal**: Access detailed instructions and explanations
- **Reset**: Clear all selections and start over

## Browser Requirements

### Minimum Requirements
- **Modern Browser**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: ES6 support (async/await, modules, arrow functions)
- **CSS**: Custom properties, flexbox, grid layout
- **APIs**: Fetch, localStorage, canvas (for charts)

### Recommended
- **Screen Size**: 1024x768 or larger for optimal experience
- **Network**: Local server for full CSV data integration
- **JavaScript Enabled**: Required for all interactive features

## Technical Implementation

### Architecture
- **Frontend-Only**: Pure HTML, CSS, and JavaScript - no backend required
- **Modular Design**: Separate modules for CSV parsing, UI rendering, and simulation
- **Progressive Enhancement**: Graceful fallback if CSV loading fails
- **Responsive Layout**: CSS Grid and Flexbox for adaptive design

### Data Integration
- **CSV Parser**: Custom implementation with error handling and fallbacks  
- **Dynamic Rendering**: Options populated from CSV data with rich metadata
- **Tooltip System**: Enhanced with full descriptions, literature links, and examples
- **Search Engine**: Real-time filtering across names, descriptions, and metadata

### Simulation Engine
- **Scoring Model**: Multi-factor success probability calculation
- **Monte Carlo**: 1000-iteration statistical analysis  
- **Visualization**: Canvas-based outcome distribution charts
- **Export Format**: JSON with timestamp, configuration, and results

## Customization

### Adding New Options
1. Edit `AI_Governance_Mapping.csv` with new entries
2. Follow the existing column structure and data format
3. Refresh the browser to see changes (may require server restart)

### Modifying Scoring
- Edit the `evaluateOnce()` function in `app.js`
- Adjust base scores, penalties, and bonuses as needed
- Update synergy and contradiction definitions in `SPEC` object

### Styling Changes
- Modify CSS custom properties in `:root` for color themes
- Adjust responsive breakpoints in media queries
- Customize tooltip appearance and behavior

## Accessibility

- **Keyboard Navigation**: Full support with visible focus indicators
- **Screen Readers**: Semantic HTML and ARIA labels
- **High Contrast**: Automatic adaptation for high contrast preferences  
- **Responsive Text**: Scalable fonts and layouts
- **Color Independence**: Information conveyed through multiple visual cues

## License & Attribution

This tool is designed for educational and research purposes. The underlying governance data synthesizes research from multiple academic and policy sources. Users should verify information independently for any practical applications.

For questions, issues, or contributions, please refer to the project repository or contact the maintainers.

---

**Version**: 4.0  
**Last Updated**: 2025-01-01  
**Browser Tested**: Chrome, Firefox, Safari, Edge