jQuery.fn.letterDrop = function() {
  var obj = this;
  
  var drop = {
    arr : obj.text().split( '' ),
    
    range : {
      min : 1,
      max : 9
    },
    
    styles : function() {
      var dropDelays = '\n', addCSS;
      
       for ( i = this.range.min; i <= this.range.max; i++ ) {
         dropDelays += '.ld' + i + ' { animation-delay: 1.' + i + 's; }\n';  
       }
      
        addCSS = $( '<style>' + dropDelays + '</style>' );
        $( 'head' ).append( addCSS );
    },
    
    main : function() {
      var dp = 0;
      obj.text( '' );
      
      $.each( this.arr, function( index, value ) {

        dp = dp.randomInt( drop.range.min, drop.range.max );
        
        if ( value === ' ' )
          value = '&nbsp';
        
          obj.append( '<span class="letterDrop ld' + dp + '">' + value + '</span>' );
        
      });
          
    }
  };
   
  Number.prototype.randomInt = function ( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
  };
  
  
  // Create styles
  drop.styles();

  // Initiate
  drop.main();
   
};


jQuery.fn.cherryPie = function( options ) { 
  
  // Application settings
  var CANVAS = this[0],
      o = $.extend({
        data      : [ 50, 50 ],
        colors     : [ '#F62459 ', '#F64747' ],
        arcX      : this.width() / 2,
        arcY      : this.height() / 2,
        radius    : ( this.width() / 2 ) - 1 // Subtract 1 to avoid the borders touching
      }, options);
 

  // Application scope
  var pie = {
    startEndAngle : 0,
    
    _total : function() {
      var sumOfSections = 0;

       for ( var i = 0; i < o.data.length; i++ ) {
         sumOfSections += ( typeof o.data[i] === 'number' ) ? o.data[i] : 0;
       }

      return sumOfSections;
    },
    
    plot : function() {
      var ctx, TOTAL = pie._total();
      
      // Initialise canvas and clear
      ctx = CANVAS.getContext( '2d' );
       ctx.clearRect( 0, 0, CANVAS.width, CANVAS.height );
      
      // Plot and fill each segment
        for ( var i = 0; i < o.data.length; i++ ) {
          ctx.fillStyle = o.colors[i];
          ctx.beginPath();
          ctx.moveTo( o.arcX, o.arcY );
          
          ctx.arc( o.arcX, 
                   o.arcY, 
                   o.radius, 
                   this.startEndAngle, 
                   this.startEndAngle + 
                   ( Math.PI * 2 * ( o.data[i] / TOTAL ) ), false
                  );
          
          ctx.lineTo( o.arcX, o.arcY0 );
          ctx.fill();
        
          // Increment angle for next segment
          this.startEndAngle += Math.PI * 2 * ( o.data[i] / TOTAL );
        }          
    }
    
  };
  
  // Chainability - return for each
  return this.each( function() {
    
    // Initialise
    pie.plot();
  });
  
};


// Main

$( 'h1' ).letterDrop();

$( '.skillset' ).cherryPie({
  data : [ 40, 30, 20, 10 ],
  colors : [ "#2C3E50","#22A7F0","#663399","#F62459","#53777A" ]
});

$( '.business-card' ).hide().fadeIn(2000);